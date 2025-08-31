using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Middlewares;
using FlexScaffoldSystems.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace FlexScaffoldSystems.Services;

public class ItemJobSiteService
{
    private readonly  DbContextConnection _dbContext;

    public ItemJobSiteService(DbContextConnection dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<ApiResponse<ItemJobSiteCategory>> CreateItemJobSite(CreateItemJobSiteDto dto)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();


        try
        {
            if (dto == null)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Please provide a DTO");
            }

            var jobSiteExists = await _dbContext.JobSiteCategories.AnyAsync(jsc => jsc.id == dto.JobSiteCategoryId);
            if (!jobSiteExists)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Job site doesn't exist");
            }

            var item = await _dbContext.Items.Where(i => i.Id == dto.ItemId).FirstOrDefaultAsync();
            if (item == null)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Item not found");
            }

            if (dto.Quantity <= 0)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Quantity must be greater than 0");
            }

            if (item.Quantity < dto.Quantity)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Item quantity is Larger than current stock");
            }
            
            var itemJobSiteExists = await _dbContext.ItemJobSiteCategories.AnyAsync(ijsc => ijsc.ItemId == dto.ItemId && ijsc.JobSiteCategoryId == dto.JobSiteCategoryId);
            if (itemJobSiteExists)
            {
                return new ApiResponse<ItemJobSiteCategory>(false, null, "Item job site already exists");
            }


            item.Quantity -= dto.Quantity;
            var newJobSiteItem = new ItemJobSiteCategory()
            {
                JobSiteCategoryId = dto.JobSiteCategoryId,
                ItemId = item.Id,
                Quantity = dto.Quantity,
                Description = dto.Description,
                Note = dto.Note,
            };
            await _dbContext.ItemJobSiteCategories.AddAsync(newJobSiteItem);
            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();
            return new ApiResponse<ItemJobSiteCategory>(true, newJobSiteItem);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            return ApiResponse<ItemJobSiteCategory>.Fail("Something went wrong");
        }
    }

    public async Task<ApiResponse<List<ItemJobSiteCategory>>> GetItemsByJobSiteCategory(int? jobSiteCategoryId)
    {
        if (jobSiteCategoryId is null)
            return ApiResponse<List<ItemJobSiteCategory>>.Fail("JobSiteCategoryId must be provided");

        var items = await _dbContext.ItemJobSiteCategories
            .Include(ijsc => ijsc.Item) 
            .Where(ijsc => ijsc.JobSiteCategoryId == jobSiteCategoryId.Value)
            .ToListAsync();

        if (!items.Any())
            return ApiResponse<List<ItemJobSiteCategory>>.Fail("No items found for this Job Site Category");

        return ApiResponse<List<ItemJobSiteCategory>>.Ok(items);
    }
    public async Task<ApiResponse<ItemJobSiteCategory>> UpdateItemJobSite(UpdateItemJobSiteDto dto)
{
    var transaction = await _dbContext.Database.BeginTransactionAsync();
    try
    {
        /*Find the ItemJobSite of the Item we want to Update*/
        var itemJobSite = await _dbContext.ItemJobSiteCategories.FindAsync(dto.ItemJobSiteId);

        /*Check if null*/
        if (itemJobSite == null)
            return ApiResponse<ItemJobSiteCategory>.Fail("ItemJobSite not found");

        /*Find the old Item related to this ItemJobSite*/
        var oldItem = await _dbContext.Items
            .Where(i => i.Id == itemJobSite.ItemId)
            .FirstOrDefaultAsync();

        /*Check if old Item exists (safety check)*/
        if (oldItem == null)
            return ApiResponse<ItemJobSiteCategory>.Fail("Old item not found");

        /*Check if we are updating to a new ItemId*/
        if (dto.ItemId != itemJobSite.ItemId)
        {
            var anyItemJobSiteIdExists = await _dbContext.ItemJobSiteCategories.AnyAsync(ijsc => ijsc.ItemId == dto.ItemId && ijsc.JobSiteCategoryId == dto.JobSiteCategoryId);
            if (anyItemJobSiteIdExists)
            {
                return new  ApiResponse<ItemJobSiteCategory>(false, null, "This Item arleady exists please edit the Item");
            }
            /*Get the new Item we want to assign*/
            var newItem = await _dbContext.Items
                .Where(i => i.Id == dto.ItemId)
                .FirstOrDefaultAsync();

            /*Check if the new Item actually exists*/
            if (newItem == null)
                return ApiResponse<ItemJobSiteCategory>.Fail("New item not found");

            /*Check if the new Item has enough stocks for the requested quantity*/
            if (newItem.Quantity < dto.Quantity)
            {
                return new ApiResponse<ItemJobSiteCategory>(
                    false, null, "New item has quantity of " + newItem.Quantity);
            }

            /*Check if the requested quantity is valid*/
            if (dto.Quantity <= 0)
            {
                return new ApiResponse<ItemJobSiteCategory>(
                    false, null, "Quantity must be greater than 0");
            }

            /*Update the ItemJobSite to point to the new Item*/
            itemJobSite.ItemId = newItem.Id;

            /*Return the old reserved quantity to the old Item stock*/
            oldItem.Quantity += itemJobSite.Quantity;

            /*Update ItemJobSite with the new requested quantity*/
            itemJobSite.Quantity = dto.Quantity;

            /*Subtract the requested quantity from the new Item stock*/
            newItem.Quantity -= dto.Quantity;
        }
        else
        {
            /*Case: ItemId is the same, but quantity might change*/
            if (dto.Quantity != itemJobSite.Quantity)
            {
                /*Validate the requested quantity*/
                if (dto.Quantity <= 0)
                {
                    return new ApiResponse<ItemJobSiteCategory>(
                        false, null, "Item quantity must be greater than 0");
                }

                /*Return the old quantity back to stock first*/
                oldItem.Quantity += itemJobSite.Quantity;

                /*Check if enough stocks are available for the new quantity*/
                if (oldItem.Quantity < dto.Quantity)
                {
                    return new ApiResponse<ItemJobSiteCategory>(
                        false, null, "Not enough stock. Available: " + oldItem.Quantity);
                }

                /*Reduce stock by new quantity*/
                oldItem.Quantity -= dto.Quantity;

                /*Update ItemJobSite with the new quantity*/
                itemJobSite.Quantity = dto.Quantity;
            }
        }

        /*Always update metadata fields*/
        itemJobSite.Note = dto.Note;
        itemJobSite.Description = dto.Description;

        /*Save changes to DB*/
        await _dbContext.SaveChangesAsync();

        /*Commit transaction if successful*/
        await transaction.CommitAsync();

        /*Return success response*/
        return new ApiResponse<ItemJobSiteCategory>(true, itemJobSite);
    }
    catch (Exception e)
    {
        /*Rollback if any error occurs*/
        await transaction.RollbackAsync();
        return ApiResponse<ItemJobSiteCategory>.Fail("Something went wrong");
    }
}

}
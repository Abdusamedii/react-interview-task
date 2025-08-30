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
}
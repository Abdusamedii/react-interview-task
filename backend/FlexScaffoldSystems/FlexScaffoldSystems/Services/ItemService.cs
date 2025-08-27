using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Middlewares;
using FlexScaffoldSystems.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace FlexScaffoldSystems.Services;

public class ItemService
{
    private readonly DbContextConnection _dbContext;

    public ItemService(DbContextConnection dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApiResponse<Item>> CreateItem(CreateItemDto dto)
    {
        if (String.IsNullOrEmpty(dto.Name))
        {
            return new ApiResponse<Item>(false,null,"Name is required");
        }

        if (dto.Quantity <= 0)
        {
            return new ApiResponse<Item>(false,null,"Quantity is required");
        }
        if (_dbContext.Items.AsNoTracking().Any(i => i.Name == dto.Name))
        {
            return new ApiResponse<Item>(false, null, "Item with this name arleady exists!"); 
        }
        var item = new Item(){Name = dto.Name, Quantity = dto.Quantity};
        _dbContext.Items.Add(item);
        await _dbContext.SaveChangesAsync();
        return new ApiResponse<Item>(true, item, null);
    }

    public async Task<ApiResponse<List<Item>>> GetAll(int pageNumber = 1)
    {
        var Items = await _dbContext.Items.OrderBy(js => js.Name)
            .Skip((pageNumber - 1) * 20) 
            .Take(20)
            .ToListAsync();
        if (!Items.Any())
        {
            return new ApiResponse<List<Item>>(false, null, "No Items Found");
        }

        return new ApiResponse<List<Item>>(true, Items, null);
    }
}
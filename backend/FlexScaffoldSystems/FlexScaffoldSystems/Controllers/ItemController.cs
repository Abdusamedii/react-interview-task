using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Middlewares;
using FlexScaffoldSystems.Models.DTO;
using FlexScaffoldSystems.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlexScaffoldSystems.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemController : Controller
{
    private readonly ItemService _itemService;

    public ItemController(ItemService itemService)
    {
        _itemService = itemService;
    }
    
    
    [HttpPost]
    public async Task<IActionResult> CreateItem(CreateItemDto dto)
    {
        var result =  await _itemService.CreateItem(dto);
        if (result.Success){return Ok(result);}
        return  BadRequest(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetItems()
    {
        var result =await  _itemService.GetAll();
        if (result.Success){ return Ok(result);}
        return BadRequest(result);
    }

}
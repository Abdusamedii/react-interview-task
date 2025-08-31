using FlexScaffoldSystems.Models.DTO;
using FlexScaffoldSystems.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlexScaffoldSystems.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemJobSiteController : Controller
{
    private readonly ItemJobSiteService _jobSiteService;

    public ItemJobSiteController(ItemJobSiteService jobSiteService)
    {
        _jobSiteService = jobSiteService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateItemJobSite([FromBody] CreateItemJobSiteDto dto)
    {
        var result = await _jobSiteService.CreateItemJobSite(dto);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetItemJobSites(int jobSiteCategoryId)
    {
        var result = await _jobSiteService.GetItemsByJobSiteCategory(jobSiteCategoryId);
        if (!result.Success) { return BadRequest(result);}
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateItemJobSite([FromBody] UpdateItemJobSiteDto dto)
    {
        var result = await _jobSiteService.UpdateItemJobSite(dto);
        if (!result.Success) { return BadRequest(result); }
        return Ok(result);
    }
}
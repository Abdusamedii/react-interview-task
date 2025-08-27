using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlexScaffoldSystems.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobSiteCategoryController : Controller
{

    private readonly JobSiteCategoryService _jobSiteCategoryService;

    public JobSiteCategoryController(JobSiteCategoryService jobSiteCategoryService)
    {
        _jobSiteCategoryService = jobSiteCategoryService;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get(int? pageNumber)
    {
        if (pageNumber == null)
        {
            pageNumber = 1;
        }
        var result = await _jobSiteCategoryService.GetAll(pageNumber.Value);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetByJobSiteId(int id)
    {
        var result = await _jobSiteCategoryService.GetAllByJobsite(id);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }
}
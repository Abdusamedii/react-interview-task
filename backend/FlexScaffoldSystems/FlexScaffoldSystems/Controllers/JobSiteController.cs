using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Models.DTO;
using FlexScaffoldSystems.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlexScaffoldSystems.Controllers;


[Route("api/[controller]")]
[ApiController]
public class JobSiteController : Controller
{
    private readonly JobSiteService _jobSiteService;

    public JobSiteController(JobSiteService jobSiteService)
    {
        _jobSiteService = jobSiteService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateJobSiteDTO jobSite)
    {
        var result = await _jobSiteService.CreateJobSite(jobSite);
        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _jobSiteService.GetAllJobSites();
        if (result.Success){return Ok(result);}
        return BadRequest(result);
    }
}
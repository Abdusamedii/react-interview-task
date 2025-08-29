using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Middlewares;
using Microsoft.EntityFrameworkCore;

namespace FlexScaffoldSystems.Services;

public class JobSiteCategoryService
{
    private readonly  DbContextConnection _dbContext;


    public JobSiteCategoryService(DbContextConnection dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApiResponse<List<JobSiteCategory>>> GetAll(int pageNumber = 1)
    {
        var jobSiteCategories = await _dbContext.JobSiteCategories.AsNoTracking().OrderBy(js => js.id)
            .Skip((pageNumber - 1) * 20) 
            .Take(20)
            .Include(js => js.Category)
            .ToListAsync();
        if (!jobSiteCategories.Any())
        {
            return new ApiResponse<List<JobSiteCategory>>(false, null, "No Items Found");
        }

        return new ApiResponse<List<JobSiteCategory>>(true, jobSiteCategories, null);
    }

    public async Task<ApiResponse<List<JobSiteCategory>>> GetAllByJobsite(int jobSiteId)
    {
        
        var jobSiteCategories = await _dbContext.JobSiteCategories.AsNoTracking().Where(jsc  => jsc.JobSiteId == jobSiteId).Include(js => js.Category).ToListAsync();
        if (!jobSiteCategories.Any())
        {
            return new ApiResponse<List<JobSiteCategory>>(false, null, "No Items Found");
        }
        return new ApiResponse<List<JobSiteCategory>>(true, jobSiteCategories, null);
    }

   
}
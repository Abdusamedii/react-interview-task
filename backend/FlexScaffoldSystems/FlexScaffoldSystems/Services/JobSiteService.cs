using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Entities;
using FlexScaffoldSystems.Middlewares;
using FlexScaffoldSystems.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FlexScaffoldSystems.Services;

public class JobSiteService
{
    private readonly DbContextConnection _dbContext;

    public JobSiteService(DbContextConnection dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApiResponse<JobSite>> CreateJobSite(CreateJobSiteDTO createJobsite)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();

        try
        {
            if (createJobsite.CategoryIds == null || !createJobsite.CategoryIds.Any())
            {
                return new ApiResponse<JobSite>(false, null, "No Category Was Added");
            }

            if (createJobsite.Name.IsNullOrEmpty())
            {
                return new ApiResponse<JobSite>(false, null, "Name not approved");
            }

            var jobSite = new JobSite() { Name = createJobsite.Name, Status = createJobsite.Status };
            await _dbContext.JobSites.AddAsync(jobSite);
            await _dbContext.SaveChangesAsync();
            
            var existingCategoryIds = await _dbContext.Categories
                .Where(c => createJobsite.CategoryIds.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            foreach (var categoryid in createJobsite.CategoryIds)
            {
                if (!existingCategoryIds.Contains(categoryid))
                {
                    await transaction.RollbackAsync();
                    return new ApiResponse<JobSite>(false, null, "Category Not Found");
                }

                var jobSiteCategory = new JobSiteCategory()
                {
                    CategoryId = categoryid,
                    JobSiteId = jobSite.id
                };
                await _dbContext.JobSiteCategories.AddAsync(jobSiteCategory);
            }

            await _dbContext.SaveChangesAsync();

            await transaction.CommitAsync();
            return new ApiResponse<JobSite>(true, jobSite, null);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            return new ApiResponse<JobSite>(false,null,"Failed to create job site");
        }
    }

    public async Task<ApiResponse<List<JobSite>>> GetAllJobSites(int pageNumber = 1)
    {
        var jobSites = await _dbContext.JobSites.OrderBy(js => js.Name)
            .Skip((pageNumber - 1) * 20) 
            .Take(20)
            .ToListAsync();
        if (!jobSites.Any())
        {
            return new ApiResponse<List<JobSite>>(false, null, "No Job Sites Found");
        }

        return new ApiResponse<List<JobSite>>(true, jobSites, null);
    }
    
}
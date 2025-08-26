using System.Data.Common;
using FlexScaffoldSystems.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlexScaffoldSystems.Data;

public class DbContextConnection : DbContext
{
    public DbContextConnection(DbContextOptions<DbContextConnection> options) : base(options)
    {
    }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<JobSite> JobSites { get; set; }
    public DbSet<JobSiteCategory> JobSiteCategories { get; set; }
    public DbSet<ItemJobSiteCategory> ItemJobSiteCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasIndex( c => c.Name).IsUnique();
        
        modelBuilder.Entity<JobSiteCategory>()
            .HasOne(jc => jc.JobSite)
            .WithMany(j => j.JobSiteCategories)
            .HasForeignKey(jc => jc.JobSiteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<JobSiteCategory>()
            .HasOne(jc => jc.Category)
            .WithMany(c => c.JobSiteCategories)
            .HasForeignKey(jc => jc.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<JobSiteCategory>()
            .HasIndex(jc => new { jc.JobSiteId, jc.CategoryId })
            .IsUnique();
        
        modelBuilder.Entity<ItemJobSiteCategory>()
            .HasOne(i => i.JobSiteCategory)
            .WithMany(jc => jc.ItemJobSiteCategories)
            .HasForeignKey(i => i.JobSiteCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ItemJobSiteCategory>()
            .HasOne(i => i.Item)
            .WithMany(it => it.ItemJobSiteCategories)
            .HasForeignKey(i => i.ItemId)
            .OnDelete(DeleteBehavior.Restrict); // usually you don’t want to delete an item if used elsewhere

        modelBuilder.Entity<ItemJobSiteCategory>()
            .HasIndex(i => new { i.JobSiteCategoryId, i.ItemId })
            .IsUnique();
        
        modelBuilder.Entity<JobSite>().HasIndex(js => js.Name).IsUnique();
        
    }
}
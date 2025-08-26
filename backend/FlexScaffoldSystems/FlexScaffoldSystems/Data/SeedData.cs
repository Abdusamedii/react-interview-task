using FlexScaffoldSystems.Entities;

namespace FlexScaffoldSystems.Data;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DbContextConnection>();

        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "SidewalkShed" },
                new Category { Name = "Scaffold" },
                new Category { Name = "Shoring" }
            );

            await context.SaveChangesAsync();
        }
    }
}

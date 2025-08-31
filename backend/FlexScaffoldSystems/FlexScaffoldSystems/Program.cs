using FlexScaffoldSystems.Data;
using FlexScaffoldSystems.Middlewares;
using FlexScaffoldSystems.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ItemService>();
builder.Services.AddScoped<JobSiteService>();
builder.Services.AddScoped<ItemJobSiteService>();
builder.Services.AddScoped<JobSiteCategoryService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://witty-bay-02ad12d03.2.azurestaticapps.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


/*https://witty-bay-02ad12d03.2.azurestaticapps.net/*/
builder.Services.AddDbContext<DbContextConnection>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ??
                     throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));

var app = builder.Build();

// Configure the HTTP request pipeline.

    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
app.UseMiddleware<ApiExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

await SeedData.InitializeAsync(app.Services);
app.Run();


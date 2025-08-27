using System.Text.Json.Serialization;

namespace FlexScaffoldSystems.Entities;

public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    
    [JsonIgnore] public virtual IEnumerable<JobSiteCategory> JobSiteCategories { get; set; }
}
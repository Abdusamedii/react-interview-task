using System.Text.Json.Serialization;
using FlexScaffoldSystems.Models.Enums;

namespace FlexScaffoldSystems.Entities;

public class JobSite
{
    public int id { get; set; }
    public string Name { get; set; }
    public JobSiteStatus Status { get; set; } 
    [JsonIgnore]public virtual IEnumerable<JobSiteCategory> JobSiteCategories { get; set; }
    
}
using FlexScaffoldSystems.Models.Enums;

namespace FlexScaffoldSystems.Models.DTO;

public class CreateJobSiteDTO
{
    public List<int> CategoryIds { get; set; }
    public JobSiteStatus Status { get; set; }
    public string Name { get; set; }
}
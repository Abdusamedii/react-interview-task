namespace FlexScaffoldSystems.Models.DTO;

public class UpdateItemJobSiteDto
{
    public int ItemJobSiteId { get; set; }
    public int JobSiteCategoryId { get; set; }
    public int ItemId { get; set; }
    public int Quantity { get; set; }
    public string? Description { get; set; }
    public string? Note { get; set; }
}
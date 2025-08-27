namespace FlexScaffoldSystems.Models.DTO;

public class CreateItemJobSiteDto
{
    public int JobSiteCategoryId { get; set; }
    public int ItemId { get; set; }
    public int Quantity { get; set; }
    public string? Description { get; set; }
    public string? Note { get; set; }
}
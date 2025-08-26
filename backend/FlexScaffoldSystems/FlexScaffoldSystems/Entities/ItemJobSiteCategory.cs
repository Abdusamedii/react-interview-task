namespace FlexScaffoldSystems.Entities;

public class ItemJobSiteCategory
{
    public int Id { get; set; }
    public int JobSiteCategoryId { get; set; }
    public int ItemId { get; set; }
    public int Quantity { get; set; }
    public string? Description { get; set; }
    public string? Note { get; set; }
    
    public virtual JobSiteCategory? JobSiteCategory { get; set; }
    public virtual Item? Item { get; set; }
}
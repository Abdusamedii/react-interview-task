namespace FlexScaffoldSystems.Entities;

public class JobSiteCategory
{
    
    public int id { get; set; }
    /*This is meant to represent a many to many relationship but i added an Id to ease the connection between JobSiteCategory and Item
     JobSiteId and CategoryId will be made unique
     */
    public int JobSiteId { get; set; }
    public int CategoryId { get; set; }
    public virtual JobSite? JobSite { get; set; }
    public virtual Category?  Category { get; set; }
   
    public virtual ICollection<ItemJobSiteCategory> ItemJobSiteCategories { get; set; }
}
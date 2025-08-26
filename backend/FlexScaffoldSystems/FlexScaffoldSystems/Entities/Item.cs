using System.Text.Json.Serialization;

namespace FlexScaffoldSystems.Entities;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    
    [JsonIgnore]public virtual ICollection<ItemJobSiteCategory> ItemJobSiteCategories { get; set; }
}
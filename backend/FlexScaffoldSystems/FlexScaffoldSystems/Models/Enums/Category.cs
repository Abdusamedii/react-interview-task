using System.Runtime.Serialization;

namespace FlexScaffoldSystems.Models.Enums;

public enum Category
{
    [EnumMember(Value = "SidewalkShed")]
    Sidewalk,
    [EnumMember(Value = "Scaffold")]
    Scaffold,
    [EnumMember(Value = "Shoring")]
    Shoring,
}
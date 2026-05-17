namespace MineralCards.Models
{
    public class Mineral
    {
        public string? Name { get; set; }
        public string? Formula { get; set; }
        public string? MineralGroup { get; set; } 
        public string? ColorNames { get; set; }
        public string? Streak { get; set; }
        public string? Luster { get; set; }
        public string? Hardness { get; set; }
        public string? Cleavage { get; set; }
        public string? Fracture { get; set; }
        public string? Density { get; set; } 
        public string? Tenacity { get; set; } 
        public string? Diaphaneity { get; set; } 
        public string? Magnetism { get; set; } 
        public string? CrystalSystem { get; set; } 
        public string? Symmetry { get; set; } 
        public string? CrystalMorphology { get; set; } 
        public bool Acid { get; set; }
        public string? Tip { get; set; }
        public string? ImageUrl { get; set; } 
        public string? ImageThinSection { get; set; } 
        public string? ImageCinematic { get; set; } 
        public string[]? Colors { get; set; } 
        public string? StreakHex { get; set; } 
        public bool IsAstrobiology { get; set; }
        public string? AstroTip { get; set; }
    }
}
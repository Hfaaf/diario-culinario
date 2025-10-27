
namespace Api.Models
{
    public class UserRecipeCreateDto
    {
        public string Title { get; set; } = null!;
        public string Ingredients { get; set; } = null!;
        public string Instructions { get; set; } = null!;
        
        public IFormFile ImageFile { get; set; } = null!;
    }
}
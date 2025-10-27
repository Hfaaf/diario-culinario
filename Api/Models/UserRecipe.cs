using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class UserRecipe
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = null!;
        public string Ingredients { get; set; } = null!;
        public string Instructions { get; set; } = null!;

        public string ImageUrl { get; set; } = null!; 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
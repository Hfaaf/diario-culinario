using Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Api.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<UserRecipe> _recipesCollection;

        public MongoDbService(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _recipesCollection = mongoDatabase.GetCollection<UserRecipe>(mongoDbSettings.Value.CollectionName);
        }

        // GET (Todos)
        public async Task<List<UserRecipe>> GetAsync() =>
            await _recipesCollection.Find(_ => true).ToListAsync();

        // GET (Por ID)
        public async Task<UserRecipe?> GetAsync(string id) =>
            await _recipesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // POST
        public async Task CreateAsync(UserRecipe newRecipe) =>
            await _recipesCollection.InsertOneAsync(newRecipe);

        // (Opcional: Adicione UpdateAsync e RemoveAsync se precisar)
    }
}
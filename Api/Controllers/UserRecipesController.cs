using Api.Models; // Adicione este using
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRecipesController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UserRecipesController(MongoDbService mongoDbService, IWebHostEnvironment hostEnvironment)
        {
            _mongoDbService = mongoDbService;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/UserRecipes
        [HttpGet]
        public async Task<List<UserRecipe>> Get() =>
            await _mongoDbService.GetAsync();

        
        // POST: api/UserRecipes
        // **** ATUALIZE ESTE MÉTODO ****
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] UserRecipeCreateDto recipeDto)
        {
            // Verifique o arquivo dentro do DTO
            if (recipeDto.ImageFile == null || recipeDto.ImageFile.Length == 0)
            {
                return BadRequest("Nenhum arquivo de imagem foi enviado.");
            }

            // 1. Salvar a Imagem no Servidor (na pasta wwwroot/images)
            string wwwRootPath = _hostEnvironment.WebRootPath;
            // Use o DTO para obter o nome do arquivo
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(recipeDto.ImageFile.FileName);
            string imagePath = Path.Combine(wwwRootPath, "images", fileName);
            string imageUrl = "/images/" + fileName; 

            try
            {
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    // Use o DTO para copiar o arquivo
                    await recipeDto.ImageFile.CopyToAsync(fileStream);
                }
            }
            catch (Exception ex)
            {
                // Log do erro (não feito aqui)
                return StatusCode(500, "Erro interno ao salvar a imagem.");
            }
            
            // 2. Criar o objeto da Receita
            var newRecipe = new UserRecipe
            {
                // Use os dados do DTO
                Title = recipeDto.Title,
                Ingredients = recipeDto.Ingredients,
                Instructions = recipeDto.Instructions,
                ImageUrl = imageUrl, 
                CreatedAt = DateTime.UtcNow
            };

            // 3. Salvar no MongoDB
            await _mongoDbService.CreateAsync(newRecipe);

            // Retorna o objeto criado
            return CreatedAtAction(nameof(Get), new { id = newRecipe.Id }, newRecipe);
        }
    }
}
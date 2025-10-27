using System.Text.Json.Serialization.Metadata;
using Api.Models;
using Api.Services;
using Microsoft.Extensions.FileProviders; // Para servir arquivos estáticos

var builder = WebApplication.CreateBuilder(args);

// --- Serviços ---

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolver = new DefaultJsonTypeInfoResolver();
});

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.TypeInfoResolver = new DefaultJsonTypeInfoResolver();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173") // Endereço do seu app React (Vite)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- Pipeline ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}

// 5. Garantir que a pasta wwwroot exista (CORRIGIDO)
string wwwRootPath = app.Environment.WebRootPath;

// Se a wwwroot não existir (WebRootPath for null),
// vamos defini-la manualmente para a pasta 'wwwroot' na raiz do app (ContentRoot)
if (string.IsNullOrEmpty(wwwRootPath))
{
    wwwRootPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot");
    
    // E se nem a pasta 'wwwroot' existir, nós a criamos.
    if (!Directory.Exists(wwwRootPath))
    {
        Directory.CreateDirectory(wwwRootPath);
    }
    
    // Atualiza o WebRootPath no ambiente (importante para o UseStaticFiles)
    app.Environment.WebRootPath = wwwRootPath;
}
string imagesPath = Path.Combine(wwwRootPath, "images");
if (!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
}


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(wwwRootPath),
    RequestPath = ""
});


// 7. Usar CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();
app.Run();
using DOMAIN.Db;
using Nest;
using SERVICE.Contracts;
using SERVICE.Implementations;
using Microsoft.Extensions.Configuration;

using SERVICE.OrderHubs;
using SERVICE.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var settings = new ConnectionSettings(new Uri("http://localhost:9200")).DefaultIndex("menus");
var client = new ElasticClient(settings);
builder.Services.AddSingleton<IElasticClient>();
builder.Services.AddSignalR();
builder.Services.AddStackExchangeRedisCache(opt =>
{
    opt.Configuration = builder.Configuration.GetSection("Redis:ConnectionString").Value;
});
builder.Services.AddScoped<IItemEngine, ItemEngine>(); 
builder.Services.AddScoped<ICategoryEngine, CategoryEngine>(); 
builder.Services.AddScoped<IOrderEngine, OrderEngine>();
builder.Services.AddDbContext<ReactRestaurantDbContext>();
builder.Services.AddCors(conf =>
{
    conf.AddDefaultPolicy(pol =>
    {
        pol.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<OrdersHub>("/orders");
    endpoints.MapHub<LogHub>("logs");
});
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

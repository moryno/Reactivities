using API.Middleware;
using Application.Activities;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.Activities.Create;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container(Author: Maurice).

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// add cors policy(Author: Maurice).
builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

// inject mediatr to the service(Author: Maurice).
builder.Services.AddMediatR(typeof(List.Handler).Assembly);

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CommandValidator>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
// Use the middleware(Author: Maurice).
app.UseMiddleware<ErrorHandlingMiddlware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
// Use the cors(Author: Maurice).

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();

using System.Text;
using API.Middleware;
using Application.Activities;
using Application.Interfaces;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.security;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
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

// Use the Fluent Validator(Author: Maurice).
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CommandValidator>();

// Use the middleware(Author: Maurice).
var identyBld = builder.Services.AddIdentityCore<AppUser>();
var identityBuilder = new IdentityBuilder(identyBld.UserType, identyBld.Services);
identityBuilder.AddEntityFrameworkStores<DataContext>();
builder.Services.TryAddSingleton<ISystemClock, SystemClock>();
identityBuilder.AddSignInManager<SignInManager<AppUser>>();


// Add Authenticatio(Author: Maurice).
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateAudience = false,
            ValidateIssuer = false
        };
    });

// Add Scope(Author: Maurice).
builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();

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

// app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();
// Use the cors(Author: Maurice).

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();

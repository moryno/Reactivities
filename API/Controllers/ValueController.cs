using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ValueController : Controller
    {

        private readonly DataContext _context;

        public ValueController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Value>>> GetValues()
        {
            return Ok(await _context.Values.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> GetValue(int id)
        {
            var value = await _context.Values.FindAsync(id);
            if (value == null)
            {
                return BadRequest("No value was found");
            }
            return Ok(value);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanceAPI.Models;

namespace FinanceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaixasController : ControllerBase
    {
        private readonly FinanceContext _context;

        public CaixasController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Caixas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Caixa>>> GetCaixas()
        {
            return await _context.Caixas.ToListAsync();
        }

        // GET: api/Caixas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Caixa>> GetCaixa(int id)
        {
            var caixa = await _context.Caixas.FindAsync(id);

            if (caixa == null)
            {
                return NotFound();
            }

            return caixa;
        }

        // PUT: api/Caixas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCaixa(int id, Caixa caixa)
        {
            if (id != caixa.ID)
            {
                return BadRequest();
            }

            _context.Entry(caixa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaixaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Caixas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Caixa>> PostCaixa(Caixa caixa)
        {
            _context.Caixas.Add(caixa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCaixa", new { id = caixa.ID }, caixa);
        }

        // DELETE: api/Caixas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCaixa(int id)
        {
            var caixa = await _context.Caixas.FindAsync(id);
            if (caixa == null)
            {
                return NotFound();
            }

            _context.Caixas.Remove(caixa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CaixaExists(int id)
        {
            return _context.Caixas.Any(e => e.ID == id);
        }
    }
}

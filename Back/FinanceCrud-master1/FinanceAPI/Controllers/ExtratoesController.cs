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
    public class ExtratoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ExtratoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Extratoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Extrato>>> GetExtratos()
        {
            return await _context.Extratos.ToListAsync();
        }

        // GET: api/Extratoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Extrato>> GetExtrato(int id)
        {
            var extrato = await _context.Extratos.FindAsync(id);

            if (extrato == null)
            {
                return NotFound();
            }

            return extrato;
        }

        // PUT: api/Extratoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExtrato(int id, Extrato extrato)
        {
            if (id != extrato.ID)
            {
                return BadRequest();
            }

            _context.Entry(extrato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExtratoExists(id))
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

        // POST: api/Extratoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Extrato>> PostExtrato(Extrato extrato)
        {
            _context.Extratos.Add(extrato);

            if (extrato.Entrada)
            {
                _context.Caixas.FirstOrDefault().SaldoAtual += extrato.Valor;
            }
            else
            {
                _context.Caixas.FirstOrDefault().SaldoAtual -= extrato.Valor;
            }
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetExtrato", new { id = extrato.ID }, extrato);
        }

        // DELETE: api/Extratoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExtrato(int id)
        {
            var extrato = await _context.Extratos.FindAsync(id);
            if (extrato == null)
            {
                return NotFound();
            }

            _context.Extratos.Remove(extrato);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExtratoExists(int id)
        {
            return _context.Extratos.Any(e => e.ID == id);
        }
    }
}

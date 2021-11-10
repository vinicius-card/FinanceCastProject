using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceAPI.Models
{
    public class FinanceContext : DbContext
    {
        public FinanceContext(DbContextOptions<FinanceContext> options) : base(options)
        { }

        public DbSet<Caixa> Caixas { get; set; }
        public DbSet<Extrato> Extratos { get; set; }

    }

}

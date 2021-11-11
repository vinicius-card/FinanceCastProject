using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceAPI.Models
{
    public class Extrato
    {
        public int ID { get; set; }
        public bool Entrada { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Descricao { get; set; }
        [Required]
        public DateTime Data { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public double Valor { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(3)")]
        public int Parcela { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.DTO
{
    public class ThemeDTO
    {
        public int themeId { get; set; }
        public int? categoryId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int? totalLession { get; set; }
        public string image { get; set; }
    }
}

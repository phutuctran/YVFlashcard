using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.DTO
{
    public class WordDTO
    {
        public int wordId { get; set; }
        public string word1 { get; set; }
        public string pronunciation { get; set; }
        public string definition { get; set; }
        public string partOfSpeech { get; set; }
        public string imageOrSynomyn { get; set; }
    }
}

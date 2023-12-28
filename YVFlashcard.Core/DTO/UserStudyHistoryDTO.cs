using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.DTO
{
    public class UserStudyHistoryDTO
    {
        public int studyHisId { get; set; }
        public string type { get; set; }
        public string username { get; set; }
        public int? lessionInfoId { get; set; }
        public int? numLearnedWord { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.DTO
{
    public class UserLessionInfoDTO
    {
        public int lessionInfoId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int totalWord { get; set; }
        public string username {  get; set; }
        public string image { get; set; }
    }
}

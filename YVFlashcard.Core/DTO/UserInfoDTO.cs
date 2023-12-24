using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.DTO
{
    [Table("UserInfo")]
    public class UserInfoDTO
    {
        public string username { get; set; }
        public string password { get; set; }
        public string fullName { get; set; }
        public DateTime? dob { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string avatar { get; set; }
        public string gender { get; set; }
        
        public string oldpassword { get; set; }
    }
}

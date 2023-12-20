using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    public class UserInfoServiceBase : IServiceBase<UserInfoDTO, string>
    {
        public void DeleteById(string key, string userSession = null)
        {
            throw new NotImplementedException();
        }

        public List<UserInfoDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserInfoes
                    .Select(x => new UserInfoDTO()
                    {
                        username = x.username,
                        fullName = x.fullName,
                        email = x.email,
                    })
                    .ToList();
            }
        }

        public UserInfoDTO GetById(string key)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserInfoes
                    .Where(x => x.username == key)
                    .Select(x => new UserInfoDTO()
                    {
                        username = x.username,
                        password = x.password,
                        fullName = x.fullName,
                        dob = x.dob,
                        phone = x.phone,
                        email = x.email,
                        address = x.address,
                        avatar = x.avatar,
                        gender = x.gender,
                    })
                    .FirstOrDefault();
            }
        }

        public UserInfoDTO Insert(UserInfoDTO entity)
        {
            throw new NotImplementedException();
        }

        public void Update(string key, UserInfoDTO entity)
        {
            throw new NotImplementedException();
        }
    }
}

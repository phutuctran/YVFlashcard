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
            using (var context = new YVFlashCardEntities1())
            {
                UserInfoes userInfoes = new UserInfoes()
                {
                    username = entity.username,
                    fullName = entity.fullName,
                    email = entity.email,
                    address = entity.address,
                    avatar = entity.avatar,
                    gender = entity.gender,
                    password = entity.password,
                    dob = entity.dob,
                    phone = entity.phone
                };
                context.UserInfoes.Add(userInfoes);
                context.SaveChanges();
                return entity;
            }


        }


        public bool CheckAuth(UserInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                var user = context.UserInfoes
                    .Where(x => x.username == entity.username)
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

                if (user.username == entity.username && user.password == entity.password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool CheckExists(UserInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                var user = context.UserInfoes
                    .Where(x => x.username == entity.username)
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

                if (user != null)
                { return true; }
                else { return false; }
            }
        }

        public void Update(string key, UserInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    UserInfoes userInfoes = context.UserInfoes.FirstOrDefault(x => x.username == key);
                    userInfoes.email = entity.email;
                    userInfoes.address = entity.address;
                    userInfoes.gender = entity.gender;
                    userInfoes.password = entity.password;
                    userInfoes.dob = entity.dob;
                    userInfoes.phone = entity.phone;
                    userInfoes.avatar = entity.avatar;
                    userInfoes.fullName = entity.fullName;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }
    }
}

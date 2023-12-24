using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;
using YVFlashcard.Core.Service.Util;

namespace YVFlashcard.Core.Service
{
    public class UserLessionInfoServiceBase : IServiceBase<UserLessionInfoDTO, int>
    {
        UserWordServiceBase userWordService;
        public UserLessionInfoServiceBase()
        {
            userWordService = new UserWordServiceBase();
        }


        public int GetTotalLesson()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserLessionInfoes.ToList().Count;
            }
        }
        public void DeleteById(int key, string userSession = null)
        {
            userWordService.DeleteAllWordByLessonId(key);
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    UserLessionInfoes lesson = context.UserLessionInfoes.FirstOrDefault(x => x.lessionInfoId == key);
                    context.UserLessionInfoes.Remove(lesson);
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        public List<UserLessionInfoDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserLessionInfoes
                    .Select(x => new UserLessionInfoDTO
                    {
                        lessionInfoId = x.lessionInfoId,
                        name = x.name,
                        description = x.description,
                        username = x.username,
                        image = x.image
                    })
                    .ToList();
            }
        }

        public UserLessionInfoDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public UserLessionInfoDTO Insert(UserLessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                UserLessionInfoes userLessionInfo = new UserLessionInfoes() 
                {
                    name = entity.name,
                    description = entity.description,
                    username = entity.username,
                    image = entity.image
                };
                context.UserLessionInfoes.Add(userLessionInfo);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, UserLessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    UserLessionInfoes entityInfo = context.UserLessionInfoes.FirstOrDefault(x => x.lessionInfoId == key);
                    entityInfo.name = entity.name;
                    entityInfo.description = entity.description;
                    entityInfo.image = entity.image;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    internal class LessionInfoServiceBase : IServiceBase<LessionInfoDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            using (var context = new YVFlashCardEntities())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    LessionInfo lessionInfo = context.LessionInfo.FirstOrDefault(x => x.themeId == key);
                    //context.LessionWord.RemoveRange(lessionInfo.LessionWord);
                    //context.LessionWord.RemoveRange(lessionInfo.StudyHistory);
                    context.LessionInfo.Remove(lessionInfo);
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        public List<LessionInfoDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities())
            {
                return context.LessionInfo
                    .Select(x => new LessionInfoDTO()
                    {
                        lessionInfoId = x.lessionInfoId,
                        themeId = x.themeId,
                        name = x.name
                        
                    })
                    .ToList();
            }
        }

        public LessionInfoDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public LessionInfoDTO Insert(LessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities())
            {
                LessionInfo lessionInfo = new LessionInfo()
                {
                    name = entity.name,
                    description = entity.description,
                    themeId = entity.themeId
                };
                context.LessionInfo .Add(lessionInfo);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, LessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    LessionInfo entityInfo = context.LessionInfo.FirstOrDefault(x => x.lessionInfoId == key);
                    entityInfo.name = entity.name;
                    entityInfo.description = entity.description;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }
    }
}

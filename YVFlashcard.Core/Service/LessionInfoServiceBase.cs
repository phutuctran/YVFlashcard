using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    public class LessionInfoServiceBase : IServiceBase<LessionInfoDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            throw new NotImplementedException();
        }

        public List<LessionInfoDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.LessionInfoes
                    .Select(x => new LessionInfoDTO
                    {
                        lessionInfoId = x.lessionInfoId,
                        name = x.name,
                        description = x.description,
                        themeId = x.themeId,    
                    })
                    .ToList();
            }
        }

        public LessionInfoDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public List<LessionInfoDTO> GetByThemeId(int key)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.LessionInfoes
                    .Where(x => x.themeId == key)
                    .Select(x => new LessionInfoDTO
                    {
                        lessionInfoId = x.lessionInfoId,
                        name = x.name,
                        description = x.description,
                        themeId = x.themeId,
                    })
                    .ToList();
            }
        }
        public LessionInfoDTO Insert(LessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                LessionInfoes lessionInfo = new LessionInfoes() 
                {
 
                    name = entity.name,
                    description = entity.description,
                    themeId = entity.themeId,
                };
                context.LessionInfoes.Add(lessionInfo);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, LessionInfoDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    LessionInfoes entityInfo = context.LessionInfoes.FirstOrDefault(x => x.lessionInfoId == key);
                    entityInfo.name = entity.name;
                    entityInfo.description = entity.description;
                    entityInfo.themeId  = entity.themeId;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    public class ThemeServiceBase : IServiceBase<ThemeDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            using (var context = new YVFlashCardEntities())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    Theme theme = context.Theme.FirstOrDefault(x => x.themeId == key);
                    //context.LessionInfo.RemoveRange(theme.LessionInfo);
                    context.Theme.Remove(theme);
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        public List<ThemeDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities())
            {
                return context.Theme
                    .Select(x => new ThemeDTO()
                    {
                        themeId = x.themeId,
                        categoryId = x.categoryId,
                        name = x.name,
                        description = x.description,
                        totalLession = x.totalLession,
                        image = x.image
                    })
                    .ToList();
            }
        }

        public ThemeDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public ThemeDTO Insert(ThemeDTO entity)
        {
            using (var context = new YVFlashCardEntities())
            {
                Theme theme = new Theme()
                {
                    name = entity.name,
                    description = entity.description,
                    categoryId = entity.categoryId,
                    image = entity.image
                };
                context.Theme.Add(theme);
                context.SaveChanges();
                return entity;
            }   
        }

        public void Update(int key, ThemeDTO entity)
        {
            using (var context = new YVFlashCardEntities())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    Theme theme = context.Theme.FirstOrDefault(x => x.themeId == key);
                    theme.name = entity.name;
                    theme.description = entity.description;
                    theme.image = entity.image;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }
    }
}

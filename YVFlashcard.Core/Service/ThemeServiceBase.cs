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
        LessionInfoServiceBase lessionInfoService;
        public ThemeServiceBase()
        {
            lessionInfoService = new LessionInfoServiceBase();
        }
        public void DeleteById(int key, string userSession = null)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    Themes theme = context.Themes.FirstOrDefault(x => x.themeId == key);
                    //context.LessionInfo.RemoveRange(theme.LessionInfo);
                    context.Themes.Remove(theme);
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        public List<ThemeDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {

                var themes = context.Themes
                    .Select(x => new ThemeDTO()
                    {
                        themeId = x.themeId,
                        categoryId = x.categoryId,
                        name = x.name,
                        description = x.description,
                        totalLession = x.totalLession,
                        image = x.image,
                        enable = true
                    })
                    .ToList();

                for (int i = 0; i < themes.Count; i++)
                {
                    themes[i].totalLession = lessionInfoService.GetTotalLessonByThemeId(themes[i].themeId);
                    themes[i].totalWords = lessionInfoService.GetTotalWordsByThemeId(themes[i].themeId);
                }
                return themes;
            }
        }

        public ThemeDTO GetById(int key)
        {
            using (var context = new YVFlashCardEntities1())
            {

                var theme = context.Themes
                    .Where(x => x.themeId == key)
                    .Select(x => new ThemeDTO()
                    {
                        themeId = x.themeId,
                        categoryId = x.categoryId,
                        name = x.name,
                        description = x.description,
                        totalLession = x.totalLession,
                        image = x.image,
                        enable = true
                    })
                    .FirstOrDefault();
                    theme.totalLession = lessionInfoService.GetTotalLessonByThemeId(theme.themeId);
                    theme.totalWords = lessionInfoService.GetTotalWordsByThemeId(theme.themeId);
                
                return theme;
            }
        }

        public ThemeDTO Insert(ThemeDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                Themes theme = new Themes()
                {
                    name = entity.name,
                    description = entity.description,
                    categoryId = entity.categoryId,
                    image = entity.image
                };
                context.Themes.Add(theme);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, ThemeDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    Themes theme = context.Themes.FirstOrDefault(x => x.themeId == key);
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
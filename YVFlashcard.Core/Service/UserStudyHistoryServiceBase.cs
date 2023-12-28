using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    public class UserStudyHistoryServiceBase : IServiceBase<UserStudyHistoryDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            throw new NotImplementedException();
        }

        public List<UserStudyHistoryDTO> GetAll()
        {
            throw new NotImplementedException();
        }

        public UserStudyHistoryDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public List<UserStudyHistoryDTO> GetHistoriesByTypeAndUserName(string type, string username)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserStudyHistories
                    .Where(x => x.type == type && x.username == username)
                    .Select(x => new UserStudyHistoryDTO()
                    {
                        studyHisId = x.studyHistoryId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numberlearnedWord,
                    }).ToList();
            }
        }

        public List<UserStudyHistoryDTO> GetHistoriesByUserName(string username)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserStudyHistories
                    .Where(x => x.username == username)
                    .Select(x => new UserStudyHistoryDTO()
                    {
                        studyHisId = x.studyHistoryId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numberlearnedWord
                    }).ToList();
            }
        }

        public UserStudyHistoryDTO GetHighScoreByLessonId(int lessonId)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserStudyHistories
                    .Where(x => x.lessionInfoId == lessonId)
                    .Select(x => new UserStudyHistoryDTO()
                    {
                        studyHisId = x.studyHistoryId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numberlearnedWord
                    })
                    .OrderByDescending(x => x.numLearnedWord).FirstOrDefault();
            }
        }

        public UserStudyHistoryDTO Insert(UserStudyHistoryDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                UserStudyHistories studyHistories = new UserStudyHistories()
                {
                    type = entity.type,
                    username = entity.username,
                    lessionInfoId = (int)entity.lessionInfoId,
                    numberlearnedWord = entity.numLearnedWord
                };
                context.UserStudyHistories.Add(studyHistories);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, UserStudyHistoryDTO entity)
        {
            throw new NotImplementedException();
        }
    }
}

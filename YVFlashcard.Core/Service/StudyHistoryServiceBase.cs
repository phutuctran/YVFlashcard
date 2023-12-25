using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    public class StudyHistoryServiceBase : IServiceBase<StudyHistoryDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            throw new NotImplementedException();
        }

        public List<StudyHistoryDTO> GetAll()
        {
            throw new NotImplementedException();
        }

        public StudyHistoryDTO GetById(int key)
        {
            throw new NotImplementedException();
        }

        public List<StudyHistoryDTO> GetHistoriesByTypeAndUserName(string type, string username)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.StudyHistories
                    .Where(x => x.type == type && x.username == username)
                    .Select(x => new StudyHistoryDTO()
                    {
                        studyHisId = x.studyHisId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numLearnedWord,
                    }).ToList();
            }
        }

        public List<StudyHistoryDTO> GetHistoriesByUserName(string username)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.StudyHistories
                    .Where(x => x.username == username)
                    .Select(x => new StudyHistoryDTO()
                    {
                        studyHisId = x.studyHisId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numLearnedWord,
                    }).ToList();
            }
        }

        public StudyHistoryDTO GetHighScoreByLessonId(int lessonId)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.StudyHistories
                    .Where(x => x.lessionInfoId == lessonId)
                    .Select(x => new StudyHistoryDTO()
                    {
                        studyHisId = x.studyHisId,
                        type = x.type,
                        username = x.username,
                        lessionInfoId = x.lessionInfoId,
                        numLearnedWord = x.numLearnedWord,
                    })
                    .OrderByDescending(x => x.numLearnedWord).FirstOrDefault();
            }
        }

        public StudyHistoryDTO Insert(StudyHistoryDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                StudyHistories studyHistories = new StudyHistories()
                {
                    type = entity.type,
                    username = entity.username,
                    lessionInfoId = entity.lessionInfoId,
                    numLearnedWord = entity.numLearnedWord,
                };
                context.StudyHistories.Add(studyHistories);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, StudyHistoryDTO entity)
        {
            throw new NotImplementedException();
        }
    }
}

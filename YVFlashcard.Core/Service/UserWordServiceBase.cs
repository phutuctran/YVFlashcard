using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service.Util
{
    public class UserWordServiceBase : IServiceBase<UserWordDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    UserWords word = context.UserWords.FirstOrDefault(x => x.wordId == key);
                    context.UserWords.Remove(word);
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }

        public void DeleteAllWordByLessonId(int key)
        {
            var words = GetWordByLessonId(key);
            foreach (var item in words)
            {
                DeleteById(item.wordId);
            }
        }

        public int GetTotalWordsByLesson(int lessonId)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserWords
                    .Where(x => x.LessionId == lessonId)
                    .ToList().Count;
            }
        }

        public List<UserWordDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserWords
                    .Select(x => new UserWordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.LessionId,

                    })
                    .ToList();
            }
        }

        public List<UserWordDTO> GetWordByLessonId(int lessionId)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserWords
                    .Where(x => x.LessionId == lessionId)
                    .Select(x => new UserWordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.LessionId,

                    })
                    .ToList();
            }
        }

        public UserWordDTO GetById(int key)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.UserWords
                    .Where(x => x.wordId == key)
                    .Select(x => new UserWordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.LessionId

                    })
                    .FirstOrDefault();
            }
        }

        public UserWordDTO Insert(UserWordDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {

                UserWords word = new UserWords()
                {
                    word = entity.word1,
                    pronunciation = entity.pronunciation,
                    definition = entity.definition,
                    partOfSpeech = entity.partOfSpeech,
                    imageOrSynomyn = entity.imageOrSynomyn,
                    LessionId = entity.lessionId
                };
                context.UserWords.Add(word);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, UserWordDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    UserWords word = context.UserWords.FirstOrDefault(x => x.wordId == key);
                    word.word = entity.word1;
                    word.pronunciation = entity.pronunciation;
                    word.definition = entity.definition;
                    word.partOfSpeech = entity.partOfSpeech;
                    word.imageOrSynomyn = entity.imageOrSynomyn;
                    word.LessionId = entity.lessionId;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }
    }
}

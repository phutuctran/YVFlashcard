using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service.Util
{
    public class WordServiceBase : IServiceBase<WordDTO, int>
    {
        public void DeleteById(int key, string userSession = null)
        {
            throw new NotImplementedException();
        }

        public List<WordDTO> GetAll()
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.Words
                    .Select(x => new WordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word1,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.lessionId,

                    })
                    .ToList();
            }
        }

        public List<WordDTO> GetWordByLessonId(int lessionId)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.Words
                    .Where(x => x.lessionId == lessionId)
                    .Select(x => new WordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word1,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.lessionId,

                    })
                    .ToList();
            }
        }

        public WordDTO GetById(int key)
        {
            using (var context = new YVFlashCardEntities1())
            {
                return context.Words
                    .Where(x => x.wordId == key)
                    .Select(x => new WordDTO()
                    {
                        wordId = x.wordId,
                        word1 = x.word1,
                        pronunciation = x.pronunciation,
                        definition = x.definition,
                        partOfSpeech = x.partOfSpeech,
                        imageOrSynomyn = x.imageOrSynomyn,
                        lessionId = x.lessionId

                    })
                    .FirstOrDefault();
            }
        }

        public WordDTO Insert(WordDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {

                Words word = new Words()
                {
                    word1 = entity.word1,
                    pronunciation = entity.pronunciation,
                    definition = entity.definition,
                    partOfSpeech = entity.partOfSpeech,
                    imageOrSynomyn = entity.imageOrSynomyn,
                    lessionId = entity.lessionId
                };
                context.Words.Add(word);
                context.SaveChanges();
                return entity;
            }
        }

        public void Update(int key, WordDTO entity)
        {
            using (var context = new YVFlashCardEntities1())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    Words word = context.Words.FirstOrDefault(x => x.wordId == key);
                    word.word1 = entity.word1;
                    word.pronunciation = entity.pronunciation;
                    word.definition = entity.definition;
                    word.partOfSpeech = entity.partOfSpeech;
                    word.imageOrSynomyn = entity.imageOrSynomyn;
                    word.lessionId = entity.lessionId;
                    context.SaveChanges();
                    trans.Commit();
                }
            }
        }
    }
}

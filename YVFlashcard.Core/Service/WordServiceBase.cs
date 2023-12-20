using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service.Interface;

namespace YVFlashcard.Core.Service
{
    internal class WordServiceBase : IServiceBase<WordDTO, int>
    {
      
            public void DeleteById(int key, string userSession = null)
            {
                using (var context = new YVFlashCardEntities())
                {
                    using (var trans = context.Database.BeginTransaction())
                    {
                       Word word = context.Word.FirstOrDefault(x => x.wordId == key);
                        //context.LessionWord.RemoveRange(lessionInfo.LessionWord);
                        //context.LessionWord.RemoveRange(lessionInfo.StudyHistory);
                        context.Word.Remove(word);
                        context.SaveChanges();
                        trans.Commit();
                    }
                }
            }

            public List<WordDTO> GetAll()
            {
                using (var context = new YVFlashCardEntities())
                {
                    return context.Word
                        .Select(x => new WordDTO()
                        {
                            wordId = x.wordId,
                            word1 = x.word1,    
                            pronunciation = x.pronunciation,
                            definition = x.definition,
                            partOfSpeech = x.partOfSpeech,
                            imageOrSynomyn = x.imageOrSynomyn,

                        })
                        .ToList();
                }
            }

            public WordDTO GetById(int key)
            {
                using (var context = new YVFlashCardEntities())
                {
                    return context.Word
                        .Where(x => x.wordId == key)
                        .Select(x => new WordDTO()
                        {
                            wordId = x.wordId,
                            word1 = x.word1,
                            pronunciation = x.pronunciation,
                            definition = x.definition,
                            partOfSpeech = x.partOfSpeech,
                            imageOrSynomyn = x.imageOrSynomyn,

                        })
                        .FirstOrDefault();
                }
            }

            public WordDTO Insert(WordDTO x)
            {
                using (var context = new YVFlashCardEntities())
                {
                Word word = new Word()
                {
                    word1 = x.word1,
                    pronunciation = x.pronunciation,
                    definition = x.definition,
                    partOfSpeech = x.partOfSpeech,
                    imageOrSynomyn = x.imageOrSynomyn
                };
                    
                    context.Word.Add(word);
                    context.SaveChanges();
                return x;
                }
            }

            public void Update(int key, WordDTO entity)
            {
                using (var context = new YVFlashCardEntities())
                {
                    using (var trans = context.Database.BeginTransaction())
                    {
                        Word word = context.Word.FirstOrDefault(x => x.wordId== key);
                        word.pronunciation = entity.pronunciation;
                        word.definition = entity.definition;
                        word.partOfSpeech = entity.partOfSpeech;
                        word.imageOrSynomyn = entity.imageOrSynomyn;
                        context.SaveChanges();
                        trans.Commit();
                    }
                }
            }
        }
}


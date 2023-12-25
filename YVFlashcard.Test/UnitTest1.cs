using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq;
using YVFlashcard.Core;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service;
using YVFlashcard.Core.Service.Util;

namespace YVFlashcard.Test
{
    [TestClass]
    public class UnitTest1
    {
        public class hisservice : StudyHistoryServiceBase { }
        public class lessonservice : LessionInfoServiceBase { }
        [TestMethod]
        public void TestMethod1()
        {
            var hisservice = new hisservice();
            var lessonservice = new lessonservice();    
            var lessons = lessonservice.GetByThemeId(8);
            if (lessons != null)
            {
                lessons[0].enable = true;
            }
            for (int i = 0; i < lessons.Count; i++)
            {
                var his = hisservice.GetHighScoreByLessonId(lessons[i].lessionInfoId);
                if (his != null)
                {
                    double tmp = (double)his.numLearnedWord / lessons[i].totalWord;
                    Console.WriteLine(tmp.ToString());
                    if (tmp > 0.7)
                    {
                        Console.WriteLine(((double)his.numLearnedWord / lessons[i].totalWord).ToString());
                        lessons[Math.Min(i + 1, lessons.Count - 1)].enable = true;
                    }
                }
            }
            foreach (var item in lessons)
            {
                Console.WriteLine(item.enable);
            }
        }
    }
}

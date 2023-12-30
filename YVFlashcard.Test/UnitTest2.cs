using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using YVFlashcard.Core.Service;

namespace YVFlashcard.Test
{
    [TestClass]
    public class UnitTest2
    {
        [TestMethod]
        public void TestMethod1()
        {
            var service = new UserStudyHistoryServiceBase();
            Console.WriteLine(service.GetTotalLearnesWordsByUsername("thaiphung"));
            var lessons = service.GetHistoriesByUserName("thaiphung");
            foreach(var item in lessons)
            {
                Console.WriteLine(item.lessionInfoId);
            }
            //Console.WriteLine(service);
        }
    }
}

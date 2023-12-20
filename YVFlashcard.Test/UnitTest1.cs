using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
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
        public class service : WordServiceBase { }
        [TestMethod]
        public void TestMethod1()
        {
            service ser = new service();
            ser.GetWordByLessonId(8);
            foreach(var item in ser.GetWordByLessonId(4)) {
                Console.WriteLine(item.word1);

            }
            //ser.DeleteById(12);
            //using (var context = new YVFlashCardEntities())
            //{
            //    Console.Write(context.UserInfo.Select(x => new UserInfoDTO
            //    {
            //        email = x.email,
            //    }).ToList().Count);
            //}
            //var service = new service();
            //List<UserInfoDTO> list = service.GetAll();
            //Console.WriteLine(list.Count);
            //UserInfoDTO userInfoDTO = service.GetById("phutuctran");
            //Console.WriteLine(userInfoDTO.email);
        }
    }
}

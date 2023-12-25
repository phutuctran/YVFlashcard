using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using YVFlashcard.Core;
using YVFlashcard.Core.DTO;
using YVFlashcard.Core.Service;
using YVFlashcard.Service;

namespace YVFlashcard.Controllers
{
    public class HomeController : Controller
    {
        UserInfoService userInfoService;
        WordService wordService;
        ThemeService themeService;
        UserLessonInfoService userLessonInfoService;
        UserWordService userWordService;
        StudyHistoryService studyHistoryService;
        LessionInfoService lessionInfoService;
        
        public HomeController()
        {
            userInfoService = new UserInfoService();
            wordService = new WordService();
            lessionInfoService = new LessionInfoService();
            themeService = new ThemeService();
            userLessonInfoService = new UserLessonInfoService();
            userWordService = new UserWordService();
            studyHistoryService = new StudyHistoryService();

        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AllUser()
        {
            List<UserInfoDTO> userInfoDTOs = userInfoService.GetAll();
            return Json(userInfoDTOs, JsonRequestBehavior.AllowGet);
        }
        public ActionResult testLevell()
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var user = userInfoService.GetById(username);
            return View(user);
        }


        public ActionResult UserPage()
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var user = userInfoService.GetById(username);
            return View(user);
        }


        public ActionResult subTheme(int themeId)
        {

            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }
            var theme = themeService.GetById(themeId);
            return View(theme);
        }

        public ActionResult viewListVocab(int lessonId)
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var lesson = lessionInfoService.GetById(lessonId);
            return View(lesson);
        }
        public ActionResult spellingLearning(int lessonId)
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var lesson = lessionInfoService.GetById(lessonId);
            return View(lesson);
        }

        public ActionResult memoryLearning(int lessonId)
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var lesson = lessionInfoService.GetById(lessonId);
            return View(lesson);
        }

        public ActionResult quizLearning(int lessonId)
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var lesson = lessionInfoService.GetById(lessonId);
            return View(lesson);
        }

        public ActionResult myWordList()
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var lessons = userLessonInfoService.GetAll();
            return View(lessons);
        }

        public ActionResult vocabularyDetail(int Id)
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }

            var words = userWordService.GetWordByLessonId(Id);
            return View(words);
        }

        public ActionResult myGraph()
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return View("Index");
            }
            return View();
        }

        public ActionResult signIn()
        { 
            return View(); 
        }

        public ActionResult signUp() 
        {
            return View();
        }

        public ActionResult signOut()
        { 
            return View(); 
        }

        [HttpPost]
        public ActionResult SignIn(UserInfoDTO userInfo)
        {
            if (userInfoService.CheckAuth(userInfo))
            {
                Session.Add("username", userInfo.username);
                Session.Add("needToTest", "test");
                return Json(true);
            }
            return Json(false);
        }

        [HttpPost]
        public ActionResult SignUp(UserInfoDTO userInfo)
        {
            if (userInfoService.CheckExists(userInfo))
            {
                return Json(false);
            }
            userInfoService.Insert(userInfo);
            return Json(true);
        }

        public ActionResult GetAllTheme()
        {
            var themeDTO = themeService.GetAll();
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (!string.IsNullOrEmpty(username))
            {
                int[] CERFID = new int[] { 0, 10, 13, 14, 17, 18, 19 };
                var his = studyHistoryService.GetHistoriesByTypeAndUserName("TESTCERF", username);
                if (his.Count > 0)
                {
                    Session["needToTest"] = "Notest";
                    var CERFSTART = his[0].numLearnedWord;
                    for (int i = 1; i <= 6; i++)
                    {
                        foreach (var item in themeDTO)
                        {
                            if (item.themeId == CERFID[i])
                            {
                                if (i > CERFSTART)
                                {
                                    item.enable = false;
                                    break;
                                }

                            }
                        }
                    }
                }
                else
                {
                    for (int i = 1; i <= 6; i++)
                    {
                        foreach (var item in themeDTO)
                        {
                            if (item.themeId == CERFID[i])
                            {
                                 item.enable = false;
                                 break;
                            }
                        }
                    }
                }
                    
                
            }
            
            return Json(themeDTO, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetUserInforByUserName(string userName)
        {
            var user = userInfoService.GetById(userName);
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateUserInfo(UserInfoDTO userInfo)
        {
            UserInfoDTO userCheck = new UserInfoDTO()
            {
                username = userInfo.username,
                password = userInfo.oldpassword
            };
            if (userInfoService.CheckAuth(userCheck))
            {
                userInfoService.Update(userInfo.username ,userInfo);
                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }

        public ActionResult GetAllUserLessonInfo()
        {
            var lessons = userLessonInfoService.GetAll();
            return Json(lessons, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertUserLessonInfo(UserLessionInfoDTO userLessionInfoDTO)
        {
            userLessonInfoService.Insert(userLessionInfoDTO);
            return Json(true);
        }

        [HttpPost]
        public ActionResult UpdateUserLessonInfo(UserLessionInfoDTO lesson)
        {
            userLessonInfoService.Update(lesson.lessionInfoId, lesson);
            return Json(true);
        }

        [HttpPost]
        public ActionResult CheckNeedToTest()
        {
            string username = Session["username"] != null ? Session["username"].ToString() : "";
            if (string.IsNullOrEmpty(username))
            {
                return Json("test");
            }
            string test = Session["needToTest"] != null ? Session["needToTest"].ToString() : "test";
            return Json(test);
        }

        [HttpPost]
        public ActionResult DeleteUserLessonInfo(UserLessionInfoDTO lesson)
        {
            userLessonInfoService.DeleteById(lesson.lessionInfoId);
            return Json(true);
        }

        [HttpPost]
        public ActionResult SetStartCERF(int index, string username)
        {
            StudyHistoryDTO studyHistoryDTO = new StudyHistoryDTO()
            {
                username = username,
                type = "TESTCERF",
                numLearnedWord = index,
            };
            studyHistoryService.Insert(studyHistoryDTO);
            ///1: A1 --> 6: C2
            int[] CERFID = new int[] { 0, 10, 13, 14, 17, 18, 19 };
            List<LessionInfoDTO> lessons = new List<LessionInfoDTO>();
            for (int i = 1; i < index; i++)
            {
                var _lessons = lessionInfoService.GetByThemeId(CERFID[i]);
                foreach (var item in _lessons)
                {
                    lessons.Add(item);
                }
            }
            foreach(var item in lessons)
            {
                int countWords = wordService.GetTotalWordsByLesson(item.lessionInfoId);
                StudyHistoryDTO _studyHistoryDTO = new StudyHistoryDTO()
                {
                    username = username,
                    type = "PASSCERF",
                    lessionInfoId = item.lessionInfoId,
                    numLearnedWord = countWords,
                };
                studyHistoryService.Insert(_studyHistoryDTO);
            }
            
            return Json(true);
        }

        [HttpPost]
        public ActionResult GetLessonbyThemeId(int themeId)
        {
            var lessons = lessionInfoService.GetByThemeId(themeId);
            if (lessons != null)
            {
                lessons[0].enable = true;
            }
            for (int i = 0; i < lessons.Count; i++)
            {
                var his = studyHistoryService.GetHighScoreByLessonId(lessons[i].lessionInfoId);
                if (his != null)
                {
                    if (((double)his.numLearnedWord / lessons[i].totalWord) > 0.7)
                    {   
                        lessons[Math.Min(i + 1, lessons.Count -1)].enable = true;
                    }
                }
            }    
            return Json(lessons, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetThemeById(int themeId)
        {
            var theme = themeService.GetById(themeId);
            return Json(theme, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetWordsByLessonId(int lessonId)
        {
            var words = wordService.GetWordByLessonId(lessonId);
            return Json(words, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveStudyHistory(StudyHistoryDTO studyHistory)
        {
            studyHistoryService.Insert(studyHistory);
            return Json(true);
        }
    }
}
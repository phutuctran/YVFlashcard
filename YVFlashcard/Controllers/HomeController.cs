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
using YVFlashcard.Service;

namespace YVFlashcard.Controllers
{
    public class HomeController : Controller
    {
        UserInfoService userInfoService;

        ThemeService themeService;
        UserLessonInfoService userLessonInfoService;
        UserWordService userWordService;
        
        public HomeController()
        {
            userInfoService = new UserInfoService();

            themeService = new ThemeService();
            userLessonInfoService = new UserLessonInfoService();
            userWordService = new UserWordService();

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
        public ActionResult DeleteUserLessonInfo(UserLessionInfoDTO lesson)
        {
            userLessonInfoService.DeleteById(lesson.lessionInfoId);
            return Json(true);
        }
    }
}
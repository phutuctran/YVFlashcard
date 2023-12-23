using System;
using System.Collections.Generic;
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
        
        public HomeController()
        {
            userInfoService = new UserInfoService();
            themeService = new ThemeService();
        }
        public ActionResult Index()
        {
            return View();
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
    }
}
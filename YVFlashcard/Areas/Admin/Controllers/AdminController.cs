using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using YVFlashcard.Controllers;
using YVFlashcard.Core.DTO;
using YVFlashcard.Service;
using YVFlashcard.Core.Service.Util;

namespace YVFlashcard.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        ThemeService themeService;
        DataHelper dataHelper;

        public AdminController()
        {
            themeService = new ThemeService();
            dataHelper = new DataHelper();
        }
        public ActionResult Index()
        {
            if (Session["user"].ToString() != "admin")
            {
                return RedirectToAction("SignIn", "Admin");
            }
            return View();
        }
        public ActionResult SignIn()
        {
            return View();
        }

        [HttpPost]        
        public ActionResult SignIn(string username, string password)
        {
            if (username == "admin" && password == "123")
            {
                Session.Add("user", username);
                return RedirectToAction("Index", "Admin");
            }
            return View();
        }


        public ActionResult Vocabulary()
        {
            
            return View();
        }

        public ActionResult wordList()
        {
            return View();
        }

        public ActionResult GetAllTheme()
        {
            var allTheme = themeService.GetAll();
            return Json(allTheme, JsonRequestBehavior.AllowGet);    
        }

        [HttpPost]
        public ActionResult UpdateTheme(ThemeDTO theme) 
        {
            themeService.Update(theme.themeId, theme);
            return View();
        }

        [HttpPost]
        public ActionResult InsertTheme(ThemeDTO theme)
        {
            themeService.Insert(theme);
            return View();
        }

        [HttpPost]
        public ActionResult DeleteTheme(int id)
        {
            themeService.DeleteById(id);
            return View();
        }

    }
}
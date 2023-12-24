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
using YVFlashcard.Core.Service;

namespace YVFlashcard.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        ThemeService themeService;
        DataHelper dataHelper;
        LessionInfoService lessionInfoService;
        WordService wordService;

        public AdminController()
        {
            themeService = new ThemeService();
            dataHelper = new DataHelper();
            lessionInfoService = new LessionInfoService();
            wordService = new WordService();
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

        public ActionResult wordList(int ThemeId)
        {
            var allLession = lessionInfoService.GetByThemeId(ThemeId);
            ViewBag.ThemeId = ThemeId;
            return View(allLession);
        }

        public ActionResult Lesson()
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
            return Json(true);
        }

        [HttpPost]
        public ActionResult InsertTheme(ThemeDTO theme)
        {
            themeService.Insert(theme);
            return Json(true);
        }

        [HttpPost]
        public ActionResult DeleteTheme(int id)
        {
            themeService.DeleteById(id);
            return Json(true);
        }

        public ActionResult GetLessionByThemeId(int key)
        {
            var allLession = lessionInfoService.GetByThemeId(key);
            return Json(allLession, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertLession(LessionInfoDTO lessionInfo)
        {
            lessionInfoService.Insert(lessionInfo);
            return Json(true);
        }

        public ActionResult GetWordByLessonid(int lessonId)
        {
            List<WordDTO> wordDTOs = wordService.GetWordByLessonId(lessonId);
            
            return Json(wordDTOs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertWord(WordDTO word) 
        {
            wordService.Insert(word);
            return Json(true);
        }

        [HttpPost]
        public ActionResult UpdateWord(WordDTO word)
        {
            wordService.Update(word.wordId, word);
            return Json(true);
        }


    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using YVFlashcard.Core;
using YVFlashcard.Core.DTO;

namespace YVFlashcard.Controllers
{
    public class HomeController : Controller
    {
        UserInfoService userInfoService;
        
        public HomeController()
        {
            userInfoService = new UserInfoService();
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


    }
}
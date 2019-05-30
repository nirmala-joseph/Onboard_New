using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Boilerplate.Web.App.Models;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {

        BusinessContext BusinessDB = new BusinessContext();
        public JsonResult GetStores()
        {
            var storeList = from s in BusinessDB.Store
                               orderby s.Id
                               select s;

            return Json(storeList);

        }

        [HttpPost]
        public JsonResult createStore([FromBody]Store st)
        {
            Console.Write("inside create store");
            BusinessDB.Store.Add(st);
            BusinessDB.SaveChanges();
            return Json("success");

        }

        [HttpPost]
        public JsonResult updateStore([FromBody]Store st)
        {
            Console.Write("inside update store");
            Store store = BusinessDB.Store.Where(s => s.Id == st.Id).SingleOrDefault();
            store.Name = st.Name;
            store.Address = st.Address;
            BusinessDB.SaveChanges();
            return Json("success");

        }

        public JsonResult deleteStore(int id)
        {
            try
            {
                Console.Write("id inside controller" + id);
                var store = BusinessDB.Store.Where(s => s.Id == id).SingleOrDefault();
                if (store != null)
                {
                    BusinessDB.Store.Remove(store);
                    BusinessDB.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return Json("Failed to delete");
            }
            return Json("success");
        }

    }
}
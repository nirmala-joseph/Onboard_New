using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Boilerplate.Web.App.Models;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductController : Controller
    {

        BusinessContext BusinessDB = new BusinessContext();
        
        public JsonResult GetProducts()
        {
            var productlist = from p in BusinessDB.Product
                               orderby p.Id
                               select p;


       
            return Json(productlist);

        }

        [HttpPost]
        public JsonResult createProduct([FromBody]Product pdt)
        {
            Console.Write("inside create product");
            BusinessDB.Product.Add(pdt);
            BusinessDB.SaveChanges();
            return Json("success");

        }

        [HttpPost]
        public JsonResult updateProduct([FromBody]Product pdt)
        {
            Console.Write("inside update product");
            Product product = BusinessDB.Product.Where(p => p.Id == pdt.Id).SingleOrDefault();
            product.Name = pdt.Name;
            product.Price = pdt.Price;
            BusinessDB.SaveChanges();
            return Json("success");

        }

        public JsonResult deleteProduct(int id)
        {
            try
            {
                Console.Write("id inside controller" + id);
                var product = BusinessDB.Product.Where(p => p.Id == id).SingleOrDefault();
                if (product != null)
                {
                    BusinessDB.Product.Remove(product);
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
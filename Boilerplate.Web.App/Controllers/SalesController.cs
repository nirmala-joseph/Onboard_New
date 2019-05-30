using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Boilerplate.Web.App.Models;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {

        BusinessContext BusinessDB = new BusinessContext();
        public JsonResult GetSales()
        {
            var salesList = BusinessDB.Sales.Select(p => new {
                Id = p.Id,
                DateSold = p.DateSold,
                CustomerName = p.Customer.Name,
                ProductName = p.Product.Name,
                StoreName = p.Store.Name

            }).ToList();
            return Json(salesList);

        }
        [HttpGet]
        public JsonResult getSale(int id)
        {
            var saleData = BusinessDB.Sales.Find(id);
            return Json (saleData);

        }


        [HttpPost]
        public JsonResult createSale([FromBody]Sales sl)
        {
            
            Console.Write("inside create sale");

           
            BusinessDB.Sales.Add(sl);
            
            BusinessDB.SaveChanges();
            
            return Json("success");

        }

        [HttpPost]
        public JsonResult updateSales([FromBody]Sales sl)
        {
            Sales sale = BusinessDB.Sales.Where(s => s.Id == sl.Id).SingleOrDefault();
            sale.CustomerId = sl.CustomerId;
            sale.ProductId = sl.ProductId;
            sale.StoreId = sl.StoreId;
            sale.DateSold = sl.DateSold;
            //BusinessDB.Entry(sale).State = EntityState.Modified;
            BusinessDB.SaveChanges();
            return Json("success");

        }

        public JsonResult deleteSales(int id)
        {
            try
            {
                Console.Write("id inside salescontroller" + id);
                var sale = BusinessDB.Sales.Where(s => s.Id == id).SingleOrDefault();
                if (sale != null)
                {
                    BusinessDB.Sales.Remove(sale);
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
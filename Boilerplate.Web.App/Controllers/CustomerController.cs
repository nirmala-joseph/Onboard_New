using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Boilerplate.Web.App.Models;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {

        BusinessContext BusinessDB = new BusinessContext();
        public JsonResult GetCustomers()
        {
            var customerList = from c in BusinessDB.Customer
                               orderby c.Id
                               select c;

            return Json(customerList);

        }

        [HttpPost]
        public JsonResult createCustomer([FromBody]Customer cust)
        {
            Console.Write("inside create customer");
            BusinessDB.Customer.Add(cust);
            BusinessDB.SaveChanges();
            return Json("success");

        }
        
        [HttpPost]
        public JsonResult updateCustomer([FromBody]Customer cust)
        {
            Console.Write("inside update customer");
            Customer customer = BusinessDB.Customer.Where(c => c.Id == cust.Id).SingleOrDefault();
            customer.Name = cust.Name;
            customer.Address = cust.Address;
            BusinessDB.SaveChanges();
            return Json("success");

        }

        public JsonResult deleteCustomer(int id)
        {
            try
            {
                Console.Write("id inside controller"+id);
                var customer = BusinessDB.Customer.Where(c => c.Id == id).SingleOrDefault();
                if (customer != null)
                {
                    BusinessDB.Customer.Remove(customer);
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
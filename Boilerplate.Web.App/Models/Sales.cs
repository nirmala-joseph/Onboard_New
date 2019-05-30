using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Web.App.Models
{
    public partial class Sales
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime? DateSold { get; set; }

        public Customer Customer { get; set; }
        public Sales IdNavigation { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
        public Sales InverseIdNavigation { get; set; }
    }
}

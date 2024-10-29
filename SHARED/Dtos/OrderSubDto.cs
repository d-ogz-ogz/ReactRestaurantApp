using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Dtos
{
    public class OrderSubDto
    {
        public int? Id { get; set; }
        public string? OrderNo { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? ReceiverName { get; set; }
        public string? ContactNumber { get; set; }
        public bool? SameAddress { get; set; }
        public decimal? GrandTotal { get; set; }
        public string? ShippingAddress { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }

    }
}

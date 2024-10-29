using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Dtos
{
    public class OrderDto
    {
        public OrderSubDto? OrderDetails { get; set; }
        public bool IsRemoved { get; set; }

        public List<OrderItemDto>? OrderItems { get; set; }
        public int UserId { get; set; }
        public virtual UserDto? User { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Dtos
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int count { get; set; }
        public string? ItemName { get; set; }
        public ItemDto? Item { get; set; }
    }
}

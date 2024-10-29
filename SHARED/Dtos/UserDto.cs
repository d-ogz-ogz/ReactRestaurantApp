using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public string? Password { get; set; }
        public bool Customer_allow { get; set; }
        public bool Customer_inform { get; set; }
        public virtual ICollection<OrderDto>? Order { get; set; }
        //public virtual Address? Address { get; set; }
    }
}

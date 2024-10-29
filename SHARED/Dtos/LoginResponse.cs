using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Dtos
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public UserDto? User { get; set; }
        public string token { get; set; }
    }
}

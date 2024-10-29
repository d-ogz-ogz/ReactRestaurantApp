using Microsoft.AspNetCore.Mvc;
using SERVICE.Implementations;
using SHARED.Dtos;

namespace ReactRestaurantApp.Server.Controllers
{
    [Route("Auth")]
    public class AuthController : Controller
    {
        private readonly IAuthEngine _authEngine;
        public AuthController(IAuthEngine authEngine)
        {
            _authEngine = authEngine;
        }
        public LoginResponse Login(LoggedUser loggedUser)
        {
            return new LoginResponse();
        }
        public UserDto Register(int id = 0)
        {
            return new UserDto();
        }


    }
}

using Microsoft.AspNetCore.Mvc;
using SHARED.Dtos;

namespace ReactRestaurantApp.Server.Controllers
{
    [Route("Category")]
    public class CategoryController : Controller
    {
        public List<CategoryDto> GetCategories(int id=0)
        {
            return new List<CategoryDto>();
        }
    
    }
}

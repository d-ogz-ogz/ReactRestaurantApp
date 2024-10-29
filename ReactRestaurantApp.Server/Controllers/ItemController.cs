using Microsoft.AspNetCore.Mvc;
using SERVICE.Contracts;
using SHARED.Dtos;

namespace ReactRestaurantApp.Server.Controllers
{
    [Route("Item")]
    public class ItemController : Controller
    {
        private IItemEngine _itemEngine;
        public List<ItemDto> GetItems(int categoryId=0,int productPerPage=0,int pageIndex=0) 
        {
            return _itemEngine.GetItems(categoryId, productPerPage, pageIndex);
        }
        public List<CategoryDto> GetCategories()
        {
            return _itemEngine.GetCategories();
        }

    }
}

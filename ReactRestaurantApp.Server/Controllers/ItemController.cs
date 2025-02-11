using Microsoft.AspNetCore.Mvc;
using SERVICE.Contracts;
using SHARED.Dtos;
using static SERVICE.Implementations.ItemEngine;

namespace ReactRestaurantApp.Server.Controllers
{
    [Route("Item")]
    public class ItemController : Controller
    {
        private readonly IItemEngine _itemEngine;
        public ItemController(IItemEngine itemEngine)
        {
            _itemEngine = itemEngine;
        }
        public Task<GetItemResponse> GetItems(int categoryId=0,int productPerPage=0,int pageIndex=0) 
        {
            return _itemEngine.GetItems(categoryId, productPerPage, pageIndex);
        }
     

    }
}

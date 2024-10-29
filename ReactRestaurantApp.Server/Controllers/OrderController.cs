using Microsoft.AspNetCore.Mvc;
using Nest;
using SERVICE.Contracts;
using SHARED.Dtos;
using static SERVICE.Implementations.OrderEngine;

namespace ReactRestaurantApp.Server.Controllers
{
    [Route("Order")]
    public class OrderController : Controller
    {
        private readonly IOrderEngine _orderEngine;
        public OrderController(IOrderEngine orderEngine)
        {
            _orderEngine = orderEngine;
        }
        public List<OrderResponse> GetOrders(int pageIndex, int perPage, int userId)
        {
            return this._orderEngine.GetOrders(pageIndex,perPage,userId);
        }
        public OrderResponse AddOrder(OrderDto order)
        {
            return this._orderEngine.AddOrder(order);
        }

    }
}

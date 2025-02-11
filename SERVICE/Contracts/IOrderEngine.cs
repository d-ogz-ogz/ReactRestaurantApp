using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Stripe;

using static SERVICE.Implementations.OrderEngine;

namespace SERVICE.Contracts
{
    public interface IOrderEngine
    {
        public List<OrderResponse> GetOrders(int pageIndex, int perPage, int userId);
          public Task<OrderResponse> AddOrder(OrderDto order);
        public Task<List<OrderResponse>> searchOrders(string query);
        public Boolean CreatePaymentIntent(decimal amount);
    }
}

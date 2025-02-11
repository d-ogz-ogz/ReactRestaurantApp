using SERVICE.Contracts;
using SHARED.Data_Contracts;
using SHARED.Dtos;
using Nest;
using System;
using System.Collections.Generic;
using RabbitMQ.Client;
using System.Collections;
using System.Text;
using RabbitMQ.Client.Events;
using StackExchange.Redis;
using static SERVICE.Implementations.OrderEngine;
using SERVICE.RabbitMq;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Google.Rpc;
using Stripe;
using SERVICE.Exceptions;

namespace SERVICE.Implementations
{
    public class OrderEngine : IOrderEngine
    {

        //RabbitMq



        private readonly IUnitOfWork _uow;
        private readonly RabbitMqPublisher _rabbitMqPublisher;
        private readonly IDistributedCache _cache;
        private readonly IElasticClient _elasticClient;
        public OrderEngine(IUnitOfWork uow, IDistributedCache cache, IElasticClient elasticClient)
        {
            _uow = uow;
            _rabbitMqPublisher = new RabbitMqPublisher();
            _cache = cache;
            _elasticClient = elasticClient;
        }

        public List<OrderResponse> GetOrders(int pageIndex, int perPage, int userId)
        {
            //Elastic Search Order İndexleme
            var settings = new ConnectionSettings(new Uri("http://localhost:9200")).DefaultIndex("Orders");
            var client = new ElasticClient(settings);
            var createIndexResponse = client.Indices.Create("Orders", c => c
            .Map(m => m
                .AutoMap()
            )
        );
            var index = pageIndex * perPage;
            List<OrderItemDto> userOrderItems = new List<OrderItemDto>();

            List<OrderResponse> orderInfo = new List<OrderResponse>();
            var userOrders = _uow.orders.GetAllAsync(r => userId == 0 || r.UserId == userId, null, "OrderItems").Result.Skip(index).Take(perPage).ToList();
            if (userOrders.Count > 0)
            {
                foreach (var order in userOrders)
                {
                    OrderResponse orderI = new OrderResponse();
                    orderI.OrderDate = order.OrderDetails.OrderDate;
                    orderI.ReceiverName = order.OrderDetails.OrderNo;
                    orderI.OrderNo = order.OrderDetails.OrderNo;
                    orderI.GrandTotal = order.OrderDetails.GrandTotal;
                    orderI.ShippingAddress = order.OrderDetails.ShippingAddress; ;
                    orderInfo.Add(orderI);
                    client.IndexDocument(orderI);
                    if (order != null)
                    {
                        foreach (var orderItem in order.OrderItems)
                        {

                            orderI.items.Add(orderItem);




                        }


                    }


                }


            }


            return orderInfo;

        }
        class getOrderResponse
        {

        }
        public async Task<OrderResponse> AddOrder(OrderDto order)
        {
            OrderDto orderModel = new OrderDto();
            OrderSubDto orderDetails = new OrderSubDto();
            List<OrderItemDto> items = new List<OrderItemDto>();


            try
            {
                if (order.OrderDetails != null)
                {

                    orderDetails.OrderDate = DateTime.Now;
                    orderDetails.OrderNo = Guid.NewGuid().ToString();
                    orderDetails.City = order?.OrderDetails?.City;
                    orderDetails.District = order?.OrderDetails?.District;
                    orderDetails.ContactNumber = order?.OrderDetails?.ContactNumber;
                    orderDetails.City = order?.OrderDetails?.City;
                    orderDetails.GrandTotal = order?.OrderDetails?.GrandTotal;
                    orderDetails.ShippingAddress = order?.OrderDetails?.ShippingAddress;
                    orderDetails.SameAddress = order?.OrderDetails?.SameAddress;
                }
                if (order.OrderItems.Count != 0)
                {

                    foreach (var item in order.OrderItems)
                    {
                        if (item != null)
                        {
                            OrderItemDto orderItem = new OrderItemDto();

                            orderItem.count = item.count;
                            orderItem.Id = item.Id;
                            orderItem.Item.Id = item.Item.Id;
                            orderItem.Item.Name = item.Item.Name;
                            orderItem.Item.Price = item.Item.Price;
                            orderItem.Item.Description = item.Item.Description;
                            orderItem.Item.CategoryId = item.Item.CategoryId;
                            items.Add(orderItem);
                            _uow.orderItems.Add(orderItem);
                        }

                        orderModel.OrderDetails = orderDetails;
                        _uow.orders.Add(orderModel);
                        _rabbitMqPublisher.Publish("new order","orders");
                        var orderCache = JsonConvert.SerializeObject(orderModel);
                        await _cache.SetStringAsync("order", orderCache);
                        //ElasticSearch indexi
                        var response = await _elasticClient.IndexDocumentAsync(orderModel);
                        if (!response.IsValid)
                        {
                            throw new Exception(response.OriginalException.Message);
                        }





                    }
                }


            }
            catch (Exception ex)
            {

                var publisher = new RabbitMqPublisher();
                publisher.Publish("logQueue", "log ex message:" +ex.Message);
                publisher.Publish("performanceQueue", "performance data..");

                // Redistem veriyi alma 
                //var getOrder = await _cache.GetStringAsync("order");
                //  JsonConvert.DeserializeObject<Order>(getOrder);
            }



            return new OrderResponse
            {
                OrderNo = orderModel.OrderDetails.OrderNo,
                OrderDate = orderModel.OrderDetails.OrderDate,
                GrandTotal = orderModel.OrderDetails.GrandTotal,
                ShippingAddress = orderModel.OrderDetails.ShippingAddress,
                ReceiverName = orderModel.OrderDetails.ReceiverName


            };

        }
        public class OrderResponse
        {
            public string ReceiverName = "";
            public string? OrderNo = "";
            public DateTime? OrderDate = DateTime.MinValue;
            public string? ShippingAddress = "";
            public decimal? GrandTotal = 0;
            public List<OrderItemDto> items = new List<OrderItemDto>();



        }



        public OrderResponse MapOrderToOrderResponse(OrderDto orderDto)
        {
            return new OrderResponse
            {
                ReceiverName = orderDto.User.FirstName ?? "",
                OrderNo = orderDto.OrderDetails.OrderNo ?? "0",
                OrderDate = orderDto.OrderDetails.OrderDate ?? DateTime.MinValue,
                ShippingAddress = orderDto.OrderDetails.ShippingAddress ?? "",
                GrandTotal = orderDto.OrderDetails.GrandTotal ?? 0,
                items = orderDto.OrderItems ?? new List<OrderItemDto>()


            };

        }

        public async Task<List<OrderResponse>> searchOrders(string query)
        {

            var searchResponse = await _elasticClient.SearchAsync<OrderDto>(o => o.Query(q => q.MatchAll()));
            if (!searchResponse.IsValid)
            {
                throw new Exception("Elastic Search error" + searchResponse.OriginalException.Message);

            }
            var orders = searchResponse.Documents
           .Select(orderDto => MapOrderToOrderResponse(orderDto))
           .ToList();

            return orders;
        }

        public bool CreatePaymentIntent(decimal amount)
        {
            try
            {
                // Stripe API anahtarınızı ayarlayın
                StripeConfiguration.ApiKey = "my secret key";
                // PaymentIntent oluşturma seçenekleri
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)amount,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }

                };
                // PaymentIntentService kullanarak işlem oluşturma
                var service = new PaymentIntentService();
                PaymentIntent paymentIntent = service.Create(options);
                return true;
            }
            catch (Exception ex)
            {

                throw new PaymentException("error");
            }



           
        }
    }
}



//public void SearchProduct()
//{
//    var seachResponse= client.Search<OrderDto>(o=>
//    {
//        o.Query(q => q.Bool(b =>b.Must(m=> m.Match(m=>m.Field(f => f.Name ).Query(searchTerm))))

//    })



//}
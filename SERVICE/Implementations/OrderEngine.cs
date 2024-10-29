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

namespace SERVICE.Implementations
{
    public class OrderEngine : IOrderEngine
    {

        private readonly IUnitOfWork _uow;
        public OrderEngine(IUnitOfWork uow)
        {
            _uow = uow;
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
            var userOrders = _uow.orders.GetAll(r => userId == 0 || r.UserId == userId, null, "OrderItems").Skip(index).Take(perPage).ToList();
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
        public OrderResponse AddOrder(OrderDto order)
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



                    }
                }


            }
            catch (Exception)
            {

                throw;
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
        public static void SendStockUpdateMessage(int productId, int quantityId)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(
                    queue: "Stock_Update_queue",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null

                    );
                string message = $"{productId} {quantityId}";
                var body = Encoding.UTF8.GetBytes(message);
                channel.BasicPublish(
                    exchange: "",
                    routingKey: "Stock_Update_queue",
                    body: body

                    );
            }

        }
        public void StartStockUpdateWorker()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(

                    queue: "Stock_Update_queue",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                    );

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var parts = message.Split(":");
                    int productId = int.Parse(parts[0]);
                    int quantity = int.Parse(parts[1]);
                    UpdateProductStock(productId, quantity);

                };
                channel.BasicConsume(

                    queue: "Stock_Update_queue",
                    autoAck: true,
                    consumer: consumer

                    );

            }
        }

        public void UpdateProductStock(int productId, int quantity)
        {
            // Veritabanı işlemi ile stok güncellemesi yapılır
            Console.WriteLine("Stok güncelleniyor... Ürün ID: {0}, Yeni Miktar: {1}", productId, quantity);
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
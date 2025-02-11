using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Messaging;
using Nest;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SERVICE.Hubs;
using SERVICE.OrderHubs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICE.RabbitMq
{
    public class RabbitMqConsumer
    {
        private readonly IHubContext<OrdersHub> _ordersHub;
        private readonly IHubContext<LogHub> _logHub;
        private readonly IElasticClient _elasticClient;

        public RabbitMqConsumer(IHubContext<OrdersHub> orderHub, IHubContext<LogHub> logHub)
        {
            _logHub = logHub;
            _ordersHub = orderHub;
          
        }
        public async void ConsumeMessages()
        {

            ConnectionFactory factory = new() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using IModel channel= connection.CreateModel();
            channel.QueueDeclare(queue: "orders", durable: true, exclusive: false, autoDelete: false);
            EventingBasicConsumer consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, e) =>
            {
                var body = e.Body.Span;
                var message= Encoding.UTF8.GetString(body);
                var log = new { Message = "", TimeStamp = DateTime.Now };
                _elasticClient.IndexDocument(log);

            };
             await _ordersHub.Clients.All.SendOrderMessage("Received");
    


        }
    }
}

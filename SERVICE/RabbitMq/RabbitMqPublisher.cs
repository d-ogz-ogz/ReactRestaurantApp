using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace SERVICE.RabbitMq
{
    public class RabbitMqPublisher
    {
        private readonly string _hostName = "localhost";
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMqPublisher()
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }
        public void Publish(string message, string _queueName) {
          
            _channel.QueueDeclare(queue:_queueName,durable:true,exclusive:false,autoDelete:false);
           var body = Encoding.UTF8.GetBytes(message);
            IBasicProperties properties = _channel.CreateBasicProperties();
                properties.Persistent = true;
            
            _channel.BasicPublish("", routingKey: _queueName, body: body,basicProperties:properties);

        }
        public void Dispose()
        {
            _channel.Close();
            _channel.Close();
        }

    }
}

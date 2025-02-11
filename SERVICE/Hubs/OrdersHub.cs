
using Microsoft.AspNetCore.SignalR;

namespace SERVICE.OrderHubs
{
    public class OrdersHub : Hub
    {
     
        public async Task SendOrderMessage(string message)
        {
            await Clients.Others.SendAsync("receiveMessage", message);
       
        }
 
     
    }
}

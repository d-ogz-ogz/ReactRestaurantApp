using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SERVICE.Hubs
{
    public class LogHub:Hub
    {
        public async Task SendLog(string logMessage)
        {
           await Clients.All.SendAsync("getLogMessage", logMessage);
        }
    }
}

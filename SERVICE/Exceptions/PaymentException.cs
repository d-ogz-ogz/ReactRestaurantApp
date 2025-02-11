using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICE.Exceptions
{
    public class PaymentException:Exception
    {
        public PaymentException(string errorMessage):base(errorMessage) { }
       
    }
}

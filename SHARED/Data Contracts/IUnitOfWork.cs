using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Data_Contracts
{
    public interface IUnitOfWork:IDisposable
    {
        ICategoryRepository categories { get; }
        IOrderRepository orders { get; }
        IOrderItemRepository orderItems { get; }
        IItemRepository items {  get; }

        public void Save() { }
    }
}
  
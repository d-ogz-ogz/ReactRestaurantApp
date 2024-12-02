using DOMAIN.Db;
using SHARED.Data_Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ReactRestaurantDbContext _db;
        public UnitOfWork(ReactRestaurantDbContext db)
        {
            _db = db;
            categories = new CategoryRepository(_db);
            orders = new OrderRepository(_db);
            items = new ItemRepository(_db);
            orderItems = new OrderItemRepository(_db);
        }

        public ICategoryRepository categories {  get; set; }

        public IOrderRepository orders { get; set; }
        public IOrderItemRepository orderItems { get; set; }

        public IItemRepository items { get; set; }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}

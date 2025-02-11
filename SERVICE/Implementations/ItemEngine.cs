using Microsoft.Extensions.Caching.Distributed;
using Nest;
using SERVICE.Contracts;
using SHARED.Data_Contracts;
using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICE.Implementations
{
    public class ItemEngine : IItemEngine
    {
        private readonly IUnitOfWork _uow;
   

        public ItemEngine(IUnitOfWork uow )
        {
            _uow = uow;
          

        }

        public async Task<bool> CheckStock(int itemId)
        {
            if (itemId <= 0)
            {
                throw new ArgumentException("Item ID must be greater than zero.", nameof(itemId));
            }

            var item = await _uow.items.GetByIdAsync(itemId);
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Item not found.");
            }

            return item.StockAmount > 0;
        }

        public async Task<bool> UpdateStock(int itemId,int quantity)
        {
            if (itemId <= 0)
            {
                throw new ArgumentException("Item ID must be greater than zero.", nameof(itemId));
            }

            var item = await _uow.items.GetByIdAsync(itemId);
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Item not found.");
            }

            var hasStock = await CheckStock(item.Id);
            if (!hasStock)
            {
                return false;
            }

            item.StockAmount -= quantity;
            _uow.items.Update(item);
            _uow.Save();
            return true;
        }

        public async Task<GetItemResponse> GetItems(int productPerPage, int pageIndex, int? categoryId = 0)
        {
            int index = productPerPage * pageIndex;
            var catId = categoryId ?? 0;
            var data = await _uow.items.GetAllAsync(x => categoryId == 0 || x.CategoryId == categoryId);
            var paginatedData = data.Skip(index).Take(productPerPage).ToList();

            if (!paginatedData.Any())
            {
                throw new ArgumentException("No items found for the given category.", nameof(data));
            }

            return new GetItemResponse() { Count = paginatedData.Count, Items = paginatedData };
        }

        public class GetItemResponse
        {
            public List<ItemDto> Items { get; set; }
            public int Count { get; set; }
        }
    }
}
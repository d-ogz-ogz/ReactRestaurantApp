using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SERVICE.Implementations.ItemEngine;

namespace SERVICE.Contracts
{
    public interface IItemEngine
    {

        public  Task<GetItemResponse> GetItems(int productPerPage, int pageIndex, int? categoryId = 0);
        public Task<bool> CheckStock(int itemId);
        public  Task<bool> UpdateStock(int itemId, int quantity);
    }
}

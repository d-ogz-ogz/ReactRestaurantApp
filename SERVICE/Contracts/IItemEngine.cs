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
        public getItemResponse GetItems(int categoryId = 0, int productPerPage = 0, int pageIndex = 0);
        public List<CategoryDto> GetCategories();
    }
}

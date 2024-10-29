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
        public ItemEngine(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public List<CategoryDto> GetCategories()
        {
            throw new NotImplementedException();
        }

        public List<ItemDto> GetItems(int categoryId = 0, int productPerPage = 0, int pageIndex = 0)
        {
            throw new NotImplementedException();
        }
    }
}

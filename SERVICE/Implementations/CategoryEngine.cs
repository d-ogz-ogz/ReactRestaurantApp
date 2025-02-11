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
    public class CategoryEngine : ICategoryEngine
    {
    private readonly IUnitOfWork _uow;
        public CategoryEngine(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task< List<CategoryDto>> GetCategories()
        {
            var categoryData = await _uow.categories.GetAllAsync();
            return  categoryData ?? new List<CategoryDto>();
        }
    }
}

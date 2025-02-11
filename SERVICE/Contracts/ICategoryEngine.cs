using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICE.Contracts
{
    public interface ICategoryEngine
    {
        public  Task<List<CategoryDto>> GetCategories();
    }
    }


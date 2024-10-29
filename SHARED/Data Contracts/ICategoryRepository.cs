using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Data_Contracts
{
    public interface ICategoryRepository:IRepository<CategoryDto>
    {
    }
}

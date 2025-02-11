using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SHARED.Data_Contracts
{
    public interface IRepository<T> where T : class, new()
    {
        Task<T?> GetByIdAsync(int id);

        public Task<List<T>> GetAllAsync(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = null);

        void Add(T entity);

        void Remove(T entity);

        void Update(T entity);
        Task SaveAsync();
    }
}

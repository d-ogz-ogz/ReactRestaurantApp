using DOMAIN.Db;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

public class Repository<T> where T : class
{
    private readonly ReactRestaurantDbContext _db;
    internal DbSet<T> dbSet;

    public Repository(ReactRestaurantDbContext db)
    {
        _db = db;
        this.dbSet = _db.Set<T>();
    }

    public void Add(T entity)
    {
        dbSet.Add(entity);
    }


    public async Task<T?> GetByIdAsync(int id)
    {
        return await dbSet.FindAsync(id); 
    }


    public async Task<List<T>> GetAllAsync(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string? includeProperties = null)
    {
        IQueryable<T> query = dbSet;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includeProperties != null)
        {
            foreach (var item in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(item);
            }
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        return await query.ToListAsync(); 
    }


    public void Remove(T entity)
    {
        dbSet.Remove(entity);
    }


    public void Update(T entity)
    {
        dbSet.Update(entity);
    }


    public async Task SaveAsync()
    {
        await _db.SaveChangesAsync(); 
    }
}

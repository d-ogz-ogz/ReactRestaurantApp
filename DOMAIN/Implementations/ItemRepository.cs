﻿using DOMAIN.Db;
using SHARED.Data_Contracts;
using SHARED.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Implementations
{
    public class ItemRepository : Repository<ItemDto>, IItemRepository
    {
        private readonly ReactRestaurantDbContext _db;
        public ItemRepository(ReactRestaurantDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
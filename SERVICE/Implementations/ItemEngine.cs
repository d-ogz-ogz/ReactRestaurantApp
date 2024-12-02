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
            List<CategoryDto> categories = new List<CategoryDto>();
            var categoryData = _uow.categories.GetAll().OrderBy(n => n.CategoryName).ToList();
            if (categoryData.Count > 0) {
                foreach (var category in categoryData) {
                    categories.Add(new CategoryDto
                    {
                        CategoryName = category.CategoryName,
                        Id = category.Id,


                    });
                } 
            }
            return categories;
        }

        public getItemResponse GetItems(int categoryId = 0, int productPerPage = 0, int pageIndex = 0)
        {
            var index = pageIndex * productPerPage;
            List<ItemDto> itemList = new List<ItemDto>();
            var itemData = _uow.items.GetAll(res => categoryId == 0 || res.CategoryId == categoryId).Skip(index).Take(productPerPage).ToList();
            if (itemData.Count > 0) {
                foreach (var item in itemList)
                {

                    itemList.Add(new ItemDto
                    {
                        Id = item.Id,
                        CategoryId = item.CategoryId,
                        Description = item.Description,
                        Name = item.Name,
                        Price = item.Price,

                    });
                }

            }
            return new getItemResponse() { itemList = itemList, count = itemList.Count };

        }

        public class getItemResponse
        {
            public List<ItemDto> itemList;
            public int count { get; set; }


        }
    }
}

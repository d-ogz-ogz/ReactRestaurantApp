import { CategoryModel } from "../models/CategoryModel";
import { ProductModel } from "../models/ProductModel";
import Categories from "./Categories";
import MainList from "./MainList";
import { useEffect,useState } from "react"


function Home() {
    const [items, setItems] = useState<ProductModel[]>([]);
    const [categories, setCategories] = useState <CategoryModel[]>([]);
    const getProducts = () => {
        fetch("Item / GetItems").then(res => res.json()).then(data => setItems(data)).catch(err=> console.log(err))
    }
    const getCategories = () => {
        fetch("Category / GetCategories").then(res => res.json()).then(data => setCategories(data)).catch(err=> console.log(err))
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])


    return (

        <div>
            <div>
    
                {categories.map((category) => (
                    <Categories key={category.id} category={category} />
                ))}
            </div>
  
   <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {items.map((product) => (
                <MainList key={product.id} product={product} />
            ))}
        </div>
        </div>
     
    )
}

export default Home;
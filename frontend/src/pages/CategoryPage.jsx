import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom"
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();
 
  useEffect(() => {
  const fetchData = async () => {
    await fetchProductsByCategory(category);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); 
  };
  fetchData();
}, [fetchProductsByCategory, category]);
  console.log("produts:", products)
  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>


        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products.length === 0 &&(
             <h2 className="sm:text-3xl font-semibold text-gray-300 text-center col-span-full">
                No Products found
             </h2>
          )}
           {products?.map((product)=>(
            <ProductCard key ={product._id} product={product} />
           ))}
        </motion.div>
      </div>

    </div>
  )
}

export default CategoryPage

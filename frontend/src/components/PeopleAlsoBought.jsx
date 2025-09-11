import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
const PeopleAlsoBought = () => {
  const [recomendation, setRecomendation] = useState([]);
  const [ isLoading, setIsLoading ]= useState(true);
  useEffect(() => {
    const fetchRecomentation = async () => {
      try {
        const res = await axios.get("/products/recomendation");
        setRecomendation(res.data)

      } catch (error) {
        toast.error(error.response.data.message || "An error occured");
    }
      finally {
        setIsLoading(false);

      }
    }
    fetchRecomentation();
  },[])
   if(isLoading) return <LoadingSpinner/>
  return (
    <div className="mt-2">
      <h3 className=" mt-23 text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {recomendation.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default PeopleAlsoBought


import Product from "../models/product_model.js"
import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ products })
    } catch (error) {
        console.log("Error in getAllProducts Controller ", error.message)
        res.status(500).json({ message: 'Server Error', message: error.message })
    }

}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts))
        res.json(featuredProducts)

    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "Products" })
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.url : "",
            category 
        })
        res.status(201).json(product);
  
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "product not found" })
        }              
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`Products/${publicId}`)
                console.log("delete image from cloudinary")
            } catch (error) {
                console.log("error deleting image from cloudinary", error)
            }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}


export const getRecomendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 4}

            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log("Error in getRecomendedProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const getProductsByCategory = async (req, res) => {
       const {category} = req.params;
    try {    
        const products = await Product.find({category});
       res.json({products})
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const toggleFeaturedProduct = async (req,res)=>{
    try {  
        const product = await Product.findById(req.params.id);
        if(product){
          product.isFeatured = !product.isFeatured;
          const updatedProduct = await product.save();
          await updateFeatureProductsCache();
          res.json(updatedProduct)
        } else{
            res.status(400).json({message :"Product note found"})
        }
    } catch (error) {
        console.log("Error in toggleFeturedProduct controller",e.message)
        res.status(500).json({message : "Server Error" , error : error.message})
    }
}

async function updateFeatureProductsCache() {
     try {
         const featuredProducts = await Product.find({isFeatured : true}).lean();
         await redis.set("featured_products",JSON.stringify(featuredProducts))
     } catch (error) {
        console.log('Error in update cache function')
     }
}
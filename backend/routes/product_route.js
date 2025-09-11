import express from 'express'
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecomendedProducts,getProductsByCategory ,toggleFeaturedProduct} from '../controllers/product_controller.js';
import { protectRoute, adminRoute } from '../middleware/auth_middleware.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts); 
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recomendation", protectRoute, getRecomendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);











export default router
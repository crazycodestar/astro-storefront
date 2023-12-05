import axios from "../config/axios";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  inventory: z.number(),
  image: z.string().url(),
});

const GetProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
});

const STOREID = import.meta.env.PUBLIC_STORE_ID;

export const getProducts = async () => {
  try {
    const product = await axios.get(`api/${STOREID}/product`);
    return GetProductsResponseSchema.parse(product.data);
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const result = await axios.get(`api/${STOREID}/product/${productId}`);
    return z.object({ product: ProductSchema }).parse(result.data);
  } catch (err) {
    console.log(err);
    return;
  }
};

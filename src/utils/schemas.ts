import { z } from "zod";
import { ProductSchema } from "./storeCMS";

export const CartResult = z.object({
  products: z.array(z.object({ product: ProductSchema, quantity: z.number() })),
  totalQuantity: z.number(),
  totalPrice: z.number(),
});

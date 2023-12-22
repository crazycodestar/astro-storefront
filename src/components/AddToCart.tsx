import { addCartItem } from "../stores/cart";
import { z } from "zod";
import { ProductSchema } from "../utils/storeCMS";

interface AddToCartProps {
  children?: string;
  item: z.infer<typeof ProductSchema>;
}

const AddToCart = (props: AddToCartProps) => {
  //                ^?
  const handleAddToCart = () => {
    addCartItem(props.item);
  };
  return (
    <button
      className="flex w-full items-center justify-center rounded-md bg-slate-800 px-8 py-3 text-base font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;

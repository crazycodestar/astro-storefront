import { cart as $cart, type CartResultDef } from "../stores/cart";
import { useStore } from "@nanostores/react";

const CartContent = () => {
  const cart = useStore($cart);
  const total = 200;

  return (
    <div className="w-[350px] space-y-6">
      {/* FIXME: Astro hydration error here */}
      {cart.products.map((product, index) => (
        <CartItem key={index} {...product} />
      ))}
      <div className="space-y-1">
        <div className="flex w-full justify-between">
          <p>Subtotal</p>
          <p className="font-medium">${cart.totalPrice}</p>
        </div>
        <div className="flex w-full justify-between">
          <p>Shipping</p>
          <p>${total}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-medium">Total</p>
          <p className="font-medium">${cart.totalPrice + total}</p>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ product, quantity }: CartResultDef["products"][number]) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            className="h-[60px] w-[60px] rounded-md object-cover"
            src={product.image}
            alt={product.name}
          />
          <div className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-sm text-white">
            <p>{quantity}</p>
          </div>
        </div>
        <p>{product.name}</p>
      </div>
      <p className="text-sm">${product.price}</p>
    </div>
  );
};

export default CartContent;

import {
  isCartDrawerOpen as $isCartDrawerOpen,
  cart as $cart,
} from "../stores/cart";
import { useStore } from "@nanostores/react";

const Button = () => {
  const cart = useStore($cart);
  const handleOpenCart = () => {
    $isCartDrawerOpen.set(true);
  };
  return (
    <button
      onClick={handleOpenCart}
      className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-200"
    >
      <span className="sr-only">Open your cart</span>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="pointer-events-none h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <p className="font-medium">Cart</p>
      </div>
      {cart && cart.totalQuantity ? (
        <div className="rounded-full bg-emerald-900 text-[12px] text-white sm:-right-1 sm:top-0">
          <span className="flex h-5 w-5 items-center justify-center text-center">
            {cart.totalQuantity}
          </span>
        </div>
      ) : null}
    </button>
  );
};

export default Button;

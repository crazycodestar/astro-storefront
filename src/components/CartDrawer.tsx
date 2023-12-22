import type { KeyboardEvent } from "react";
import {
  isCartDrawerOpen as $isCartDrawerOpen,
  isCartUpdating as $isCartUpdating,
  cart as $cart,
  removeCartItem,
  type CartItem,
} from "../stores/cart";
import { useStore } from "@nanostores/react";

const CartDrawer = () => {
  const cart = useStore($cart);
  const isCartDrawerOpen = useStore($isCartDrawerOpen);
  const isCartUpdating = useStore($isCartUpdating);
  const closeCartDrawer = () => {
    // FIXME: WHY
    document.querySelector("body")?.classList.remove("overflow-hidden");
    $isCartDrawerOpen.set(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeCartDrawer();
    }
  };

  const handleRemoveItem = (id: CartItem["id"]) => {
    removeCartItem(id);
  };

  if (!isCartDrawerOpen) return;

  return (
    <div
      className="relative z-50"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 focus:outline-none"
            tabIndex={-1}
            // use:clickOutside={() => closeCartDrawer()}
            // handle OnClickAway
            onKeyDown={handleKeyDown}
          >
            <div className="pointer-events-auto max-h-screen w-screen max-w-lg bg-white">
              <div className="flex max-h-screen min-h-full flex-col">
                <div className="mb-4 flex items-start justify-between p-5 shadow-sm">
                  <h2
                    className="flex items-center gap-4 text-2xl font-bold text-zinc-800"
                    id="slide-over-title"
                  >
                    Your Cart
                    {isCartUpdating ? (
                      <svg
                        className="-ml-1 mr-3 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : null}
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      onClick={closeCartDrawer}
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      {/* <!-- Heroicon name: outline/x-mark --> */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="px-5">
                    {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
                    {cart && cart.products.length ? (
                      <ul role="list" className="flex flex-col gap-6">
                        {cart.products.map(({ product, quantity }) => (
                          <li className="grid grid-cols-12 gap-3">
                            <div className="col-span-3 overflow-hidden rounded-lg lg:col-span-2">
                              <img
                                className="aspect-square aspect-1 h-full w-[100px] rounded-md object-cover object-center"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div className="col-span-7 flex flex-col gap-2 lg:col-span-8">
                              <a
                                className="w-fit hover:underline"
                                href={`/products/${product.id}`}
                              >
                                {product.name}
                              </a>
                              <p className="text-xs">${product.price}</p>
                            </div>
                            <div className="col-span-2 flex flex-col items-end justify-between">
                              <button
                                onClick={() => {
                                  handleRemoveItem(product.id);
                                }}
                                type="button"
                                disabled={isCartUpdating}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                              <div>
                                <p className="font-medium">
                                  ${product.price * quantity}
                                  {/* <Money price={item.cost.totalAmount} /> */}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-20 text-center">
                        <p className="text-gray-500">Your cart is empty</p>
                        <a
                          href="/"
                          className="font-semibold text-slate-900 hover:text-slate-700"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="">
                  {cart && cart.products.length ? (
                    <div className="border-t border-zinc-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          ${cart.totalPrice}
                          {/* <Money
                          price={$cart.cost.subtotalAmount}
                          showCurrency={true}
                        /> */}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="/checkout"
                          className="flex items-center justify-center rounded-md bg-slate-800 px-8 py-3 text-base font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

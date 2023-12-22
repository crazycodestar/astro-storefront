import { useState } from "react";
import CartContent from "./CartContent";
import InfoBoard from "./InfoBoard";
import Success from "./Success";

const CheckoutForm = () => {
  // FIXME: change modal to atom object
  const [isModal, setIsModal] = useState(false);

  const handleShowModal = () => {
    setIsModal(true);
  };

  return (
    <div className="flex h-full">
      {isModal ? (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
          <div className="flex w-[300px] flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <p className="mb-4 text-xl font-medium">Thank you</p>
            <div className="mb-6 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-200">
              <Success height={120} />
            </div>
            <p className="mb-4 text-center">
              Your order has been successfully created. An email will be sent to
              you for further details
            </p>
            <a
              href="/"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-800 px-8 py-3 text-base font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Return to Shopping
            </a>
          </div>
        </div>
      ) : null}
      <div className="flex w-1/2 flex-col items-end border-r p-8">
        <div className="w-2/3">
          <InfoBoard onShowModal={handleShowModal} />
        </div>
      </div>
      <div className="w-1/2 bg-zinc-100 p-8">
        <CartContent />
      </div>
    </div>
  );
};

export default CheckoutForm;

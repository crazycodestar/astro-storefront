import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { cart as $cart, clearCart } from "../stores/cart";
import { useStore } from "@nanostores/react";
import axios from "../config/axios";
import { STOREID } from "../utils/storeCMS";

const FORM_DATA_KEY = "infoBoard_form";

const DeliveryInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(11),
  firstName: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  address: z.string().min(3, { message: "Must be 3 or more characters long" }),
});

type DeliveryInfoSchema = z.infer<typeof DeliveryInfoSchema>;

const InfoBoard = ({ onShowModal }: { onShowModal: () => void }) => {
  const cart = useStore($cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
    reset,
  } = useForm<DeliveryInfoSchema>({
    resolver: zodResolver(DeliveryInfoSchema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<DeliveryInfoSchema> = async (data) => {
    setIsFailed(false);
    setIsLoading(true);
    const request = {
      products: cart.products.map(({ product, quantity }) => ({
        productId: product.id,
        quantity: quantity,
      })),
      ...data,
    };

    try {
      // FIXME: make baseURL work in axios
      const result = await axios.post(`/api/${STOREID}/order`, request);

      if (result.status === 200) {
        // clearing
        localStorage.removeItem(FORM_DATA_KEY);
        clearCart();

        setIsLoading(false);
        return onShowModal();
      }
    } catch (err) {
      setIsLoading(false);
      setIsFailed(true);
      console.log(err);
    }

    // TODO: handle axios success response. temp disable axios submit and work on it
    // then re-enable. I don't want to clutter the database.
    // FIXME: I don't liek the footer's colours
    // FIXME: Add quantity to cartDrawer
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        {/* <p>{JSON.stringify(baseURL, null, 2)} yo</p> */}
        <h1 className="mb-2 text-xl font-medium">Contact</h1>
        <div className="flex flex-col gap-4">
          <Input
            error={errors.email}
            title="Email"
            register={register("email")}
          />
          <Input
            error={errors.phone}
            title="Phone"
            register={register("phone")}
          />
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl font-medium">Delivery</h1>
        <div className="space-y-4">
          <div className="flex w-full gap-4">
            <Input
              error={errors.firstName}
              title="First Name"
              register={register("firstName")}
            />
            <Input
              error={errors.lastName}
              title="Last Name"
              register={register("lastName")}
            />
          </div>
          <Input
            error={errors.address}
            title="Address"
            register={register("address")}
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-md bg-slate-800 px-8 py-3 text-base font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Processing..." : "Order Now"}
      </button>
      {isFailed && <p className="mt-2 text-red-400">Failed to Process Order</p>}
    </form>
  );
};

export default InfoBoard;

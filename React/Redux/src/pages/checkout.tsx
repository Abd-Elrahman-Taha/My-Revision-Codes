import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/products/cartSlice";
import { placeOrder } from "../features/products/orderSlice";
import { toast } from "react-hot-toast";

const Checkout = () => {
 const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!user) {
      toast.error("Please login first" ,{
        style: {
          border: "1px solid #f44336",
          borderLeft: "4px solid #f44336",
          padding: "16px",
          color: "#7A1C1C",
          background: "#FFF5F5",
        },
        iconTheme: {
            primary: "#f44336",
            secondary: "#FFF5F5",
        },
        position: "bottom-right",
      });
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty"
      ,{
        style: {
          border: "1px solid #f44336",
          borderLeft: "4px solid #f44336",
          padding: "16px",
          color: "#7A1C1C",
          background: "#FFF5F5",
        },
        iconTheme: {
            primary: "#f44336",
            secondary: "#FFF5F5",
            
        },
        position: "bottom-right",
      }
      );
      navigate("/shop");
      return;
    }

    dispatch(
      placeOrder({
        userId: user.id,
        items,
        total,
      })
    );

    dispatch(clearCart());

    toast.success("Order placed successfully!" ,{
        style: {
          border: "1px solid #4CAF50",
          borderLeft: "4px solid #4CAF50",
          padding: "16px",
          color: "#155724",
          background: "#D4EDDA",
        },
        iconTheme: {
            primary: "#4CAF50",
            secondary: "#D4EDDA",
        }
        ,
        position: "bottom-right",
      }
    );

    navigate("/tracking");
  };

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[2fr_1fr]">
        {/* Billing Details */}
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-8 text-3xl font-bold text-slate-900">
            Checkout
          </h1>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                First Name
              </label>

              <input
                type="text"
                placeholder="John"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="+1 234 567 890"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Address
              </label>

              <input
                type="text"
                placeholder="Street address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                City
              </label>

              <input
                type="text"
                placeholder="New York"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                ZIP Code
              </label>

              <input
                type="text"
                placeholder="10001"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8A735A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-3 block font-medium">
                Payment Method
              </label>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-[#8A735A]">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  Cash on Delivery
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-[#8A735A]">
                  <input
                    type="radio"
                    name="payment"
                  />
                  Credit Card
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-[#8A735A]">
                  <input
                    type="radio"
                    name="payment"
                  />
                  PayPal
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Order Summary
          </h2>

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold">
                  $
                  {(item.price * item.quantity).toFixed(
                    2
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t pt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span className="text-[#8A735A]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button onClick={handlePlaceOrder}  className="mt-8 w-full rounded-xl bg-[#8A735A] py-4 text-lg font-semibold text-white transition hover:bg-[#6E5C47]">
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  CalendarDays,
  Package,
} from "lucide-react";
import { useAppSelector } from "../hooks/hooks";
import type { Order } from "../features/products/orderSlice";

const steps = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const OrderTracking = () => {
  const user = useAppSelector((state) => state.auth.user);

  const orders = useAppSelector((state) =>
    state.orders.orders.filter(
      (order: Order) => order.userId === user?.id
    )
  );

  if (!orders.length) {
    return (
      <main className="body flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white p-10 shadow text-center">
          <Package size={60} className="mx-auto text-slate-400" />
          <h1 className="products mt-4 text-3xl font-bold">
            No Orders Found
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-xl bg-[#72470a] px-6 py-3 text-white"
          >
            Go Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="body min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-6">

        <h1 className="products mb-8 text-4xl font-bold">
          Order Tracking
        </h1>

        <div className="space-y-8">

          {orders.map((order: Order) => {

           const currentStep = steps.indexOf(order.status);
        const progress =
        (currentStep / (steps.length - 1)) * 100;

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-8 shadow"
              >
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-slate-500">
                      <CalendarDays size={18} />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-100 px-5 py-4 font-semibold text-amber-700">
                    {order.status}
                  </span>

                </div>

                <div className="space-y-6">

                 <div className="mt-10">
  <h2 className="mb-8 text-2xl font-bold">
    Order Progress
  </h2>

  <div className="overflow-x-auto">
    <div className="relative flex min-w-[700px] items-center justify-between">

      {/* Gray Line */}
      <div className="absolute left-0 right-0 top-5 h-1 rounded bg-slate-200" />

      {/* Green Progress */}
      <div 
        className="absolute left-0 top-5 h-1 rounded bg-green-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

      {steps.map((step, index) => {
        const completed = index < currentStep;
        const current = index === currentStep;

        return (
          <div
            key={step}
            className="relative z-10 flex flex-1 flex-col items-center"
          >
            {completed ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckCircle2 size={20} />
              </div>
            ) : current ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                <CheckCircle2 size={20} />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-300 bg-white">
                <Circle size={18} className="text-slate-400" />
              </div>
            )}

            <p
              className={`mt-3 text-center text-sm font-semibold ${
                completed
                  ? "text-green-600"
                  : current
                  ? "text-amber-600"
                  : "text-slate-400"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</div>

                </div>

                <div className="mt-8 border-t pt-6">

                  <h3 className="mb-4 text-xl font-bold">
                    Products
                  </h3>

                  <div className="space-y-3">

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border p-4"
                      >
                        <div className="flex items-center gap-4">

                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-16 w-16 rounded-lg object-cover"
                          />

                          <div>
                            <p className="font-semibold">
                              {item.title}
                            </p>

                            <p className="text-slate-500">
                              Qty: {item.quantity}
                            </p>
                          </div>

                        </div>

                        <span className="font-bold">
                          ${item.price}
                        </span>
                      </div>
                    ))}

                  </div>

                  <div className="mt-6 flex justify-between border-t pt-4">
                    <span className="text-xl font-semibold">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#72470a]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                </div>

              </div>
            );

          })}

        </div>
      </div>
    </main>
  );
};

export default OrderTracking;
import { Link } from "react-router-dom";
import { Package, CalendarDays, DollarSign } from "lucide-react";
import { useAppSelector } from "../hooks/hooks";
import { type Order, type OrderItem } from "../features/products/orderSlice";

const Orders = () => {
  const user = useAppSelector((state) => state.auth.user);

  const orders = useAppSelector((state) =>
  state.orders.orders.filter(
    (order: Order) => order.userId === user?.id
  )
);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      case "Shipped":
        return "bg-indigo-100 text-indigo-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="products mb-8 text-4xl font-bold text-slate-900">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow">
            <Package
              className="mx-auto mb-5 text-slate-400"
              size={70}
            />

            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Your placed orders will appear here.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-block rounded-xl bg-[#72470a] px-6 py-3 font-semibold text-white transition hover:bg-[#8A735A]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order : Order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-xl"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-xl">
                        Order #{order.id.slice(0, 8)}
                      </h2>

                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mb-5 flex items-center gap-2 text-slate-500">
                      <CalendarDays size={18} />

                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {order.items.slice(0, 4).map((item : OrderItem) => (
                        <img
                          key={item.id}
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-20 w-20 rounded-xl border object-cover"
                        />
                      ))}

                      {order.items.length > 4 && (
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-200 font-bold">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between lg:items-end">
                    <div className="flex items-center gap-2 text-2xl font-bold text-[#72470a]">
                      <DollarSign size={22} />

                      {order.total.toFixed(2)}
                    </div>

                    <p className="mt-2 text-slate-500">
                      {order.items.length} item
                      {order.items.length > 1 && "s"}
                    </p>

                    <Link
                      to="/tracking"
                      className="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-[#72470a]"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
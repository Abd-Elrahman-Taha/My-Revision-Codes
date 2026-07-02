import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/products/cartSlice";
import {  Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { removeFromCart } from "../features/products/cartSlice";

const Cart = () => {
  const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-slate-900">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-semibold text-slate-700">
              Your cart is empty 🛒
            </h2>

            <p className="mt-3 text-slate-500">
              Add some amazing products to your cart.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Cart Items */}
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-24 w-24 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-slate-500">
                        {item.category}
                      </p>

                      <p className="mt-2 text-lg font-semibold text-[#8A735A]">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                 <div className="flex items-center gap-3">
  <button
    onClick={() => dispatch(decreaseQuantity(item.id))}
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-xl font-bold transition hover:bg-slate-300"
  >
    -
  </button>

  <span className="w-8 text-center text-lg font-bold">
    {item.quantity}
  </span>

  <button
    onClick={() => dispatch(increaseQuantity(item.id))}
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#72470a] text-xl font-bold text-white transition hover:bg-[#BDA88B]"
  >
    +
  </button>
    <button
  type="button"
  aria-label="Remove item"
  onClick={() => dispatch(removeFromCart(item.id))}
  className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
>
  <Trash2 size={18} />
</button>
</div>

                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Items</span>

                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>

                  <span className="font-bold text-[#8A735A]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="shop-now mt-6 block w-full rounded-xl bg-[#2F2A25] py-3 text-center font-semibold text-white transition hover:bg-[#BDA88B]">
                Checkout
                </Link>
              <button
                 onClick={() => dispatch(clearCart())}
                 className="shop-now mt-4 w-full rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Clear Cart
          </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
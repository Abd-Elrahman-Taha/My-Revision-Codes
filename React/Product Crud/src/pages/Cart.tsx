import { useContext } from "react";
import ProductContext from "../Context";

export default function Cart() {
  const context = useContext(ProductContext);

  if (!context) return null;

  const {
    cart,
    removeFromCart,
    addQuantity,
    decreaseQuantity,
    toggleSelected,
  } = context;

  const selectedItems = cart.filter((item) => item.selected);

  const totalPrice = selectedItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🛒 Your Cart
      </h1>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Your cart is empty 💤
          </p>
        ) : (
          <>
            <ul className="space-y-4">

              {cart.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  
                  <div className="flex items-center gap-4">

                    <input
                      type="checkbox"
                       aria-label="Select product"
                      checked={item.selected}
                      onChange={() =>
                        toggleSelected(item.product.id)
                      }
                      className="w-5 h-5 cursor-pointer"
                    />

                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 object-contain rounded-lg border"
                    />

                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.product.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        ${item.product.price}
                      </p>

                      <p className="text-green-600 font-medium">
                        Item Total: $
                        {(
                          item.product.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                 
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.product.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="bg-gray-100 px-4 py-1 rounded-full">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        addQuantity(item.product.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        removeFromCart(item.product.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}

            </ul>

            {/* Summary */}
            <div className="mt-8 border-t pt-6">

              <div className="flex justify-between text-lg font-semibold">
                <span>
                  Selected Items:
                </span>

                <span>
                  {selectedItems.length}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold mt-4">
                <span>Total:</span>

                <span className="text-green-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
              >
                Checkout
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
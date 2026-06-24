import type { Product } from "../Types";
import { useState } from "react";
import { toast } from "react-toastify";
import "../App.css";

type Props = {
  onAdd: (product: Product) => void;
};


export default function AddNew({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");

  const handleAdd = () => {
    if (!title || !price) {
      toast.error("Please fill in all the fields", {
        position: "top-center",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      price: Number(price),
      description,
      rating: {
        rate: Number(rate) || 0,
        count: Number(count) || 0,
      },
      thumbnail: "https://via.placeholder.com/150",
    };

    onAdd(newProduct);

    toast.success("Product added successfully", {
      position: "top-center",
    });

    setTitle("");
    setPrice("");
    setDescription("");
    setRate("");
    setCount("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border text-black placeholder:text-black">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Add New Product
      </h2>

      <input
        className="w-full border p-3 rounded-lg mb-3"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded-lg mb-3"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        className="w-full border p-3 rounded-lg mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          className="border p-3 rounded-lg"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        Add Product
      </button>
    </div>
  );
}
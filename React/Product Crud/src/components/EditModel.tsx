import type { Product } from '../Types';
import { useState } from 'react';
import '../App.css';
type Props = {
        product: Product;
        onSave: (id: number, updatedProduct: Omit<Product, 'id' | 'thumbnail'>) => void
        onClose : () => void
}

const EditModel = ( { product, onSave, onClose}: Props ) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [rate, setRate] = useState(product.rating.rate);
  const [count, setCount] = useState(product.rating.count);

  const handleSave = () => {
    onSave(product.id, { title, price, description, rating: { rate , count }});
    onClose();
  };


    return (
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black">
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-xl">
  
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
  
        <input
          className="w-full border p-2 mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
  
        <input
          className="w-full border p-2 mb-2 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
  
        <textarea
          className="w-full border p-2 mb-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
  
        <input
          className="w-full border p-2 mb-2 rounded"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          placeholder="Rate"
        />
  
        <input
          className="w-full border p-2 mb-4 rounded"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="Count"
        />
  
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="btn3 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
  
          <button
            onClick={handleSave}
            className="btn1 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
        </>
    )    
}
export default EditModel;
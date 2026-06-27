import {useState, useEffect} from 'react';
import {useAppDispatch , useAppSelector} from '../hooks/hooks';
import {updateProduct  } from '../features/products/productSlice';

import type {Product} from '../types/product';
import {closeEditProduct} from '../features/products/editproductSlice';

function EditModel() {
    const {selectedProduct} = useAppSelector((state) => state.editProduct);
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<Product>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        thumbnail: '',
        rating: 0,
        stock: 0,
    });
    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={(e) => setProduct({...product, title: e.target.value})}
                    placeholder="Title"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                />
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={(e) => setProduct({...product, description: e.target.value})}
                    placeholder="Description"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({...product, price: Number(e.target.value)})    }
                    placeholder="Price"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                />
                <button
                    
                    onClick={() => {
                        console.log('Updating product:', product);
                        dispatch(updateProduct(product))}}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Update Product
                </button>
                <button onClick={() => dispatch(closeEditProduct())} className="bg-gray-500 text-white py-2 px-4 rounded-md ml-2">
                    Cancel
                </button>
            </div>
        </div>
    );
}
    
export default EditModel;
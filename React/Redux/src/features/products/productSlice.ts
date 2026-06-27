import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {closeEditProduct } from './editproductSlice'
import type {Product} from '../../types/product'
import axios from 'axios'
interface ProductState {
    products: Product[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async() => {
        const response = await axios.get("https://dummyjson.com/products")
        return response.data.products
    }
)

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (updatedProduct: Product, {dispatch}) => {
        const response = await axios.put(
            `https://dummyjson.com/products/${updatedProduct.id}`,
            updatedProduct
        );
        
        dispatch(closeEditProduct());
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId: number) => {
        await axios.delete(`https://dummyjson.com/products/${productId}`);
        return productId;
    }
);



const initialState: ProductState = {
    products: [],
    loading: "idle",
    error: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            console.log("Update product fulfilled:", action.payload);
            const updatedProduct = action.payload;
            const index = state.products.findIndex(
                (product) => product.id === updatedProduct.id
            );
             console.log(index);
            if (index !== -1) {
                state.products[index] = updatedProduct;
            }
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const deletedProductId = action.payload;
            state.products = state.products.filter(
                (product) => product.id !== deletedProductId
            );
        });
    }
});

export default productSlice.reducer
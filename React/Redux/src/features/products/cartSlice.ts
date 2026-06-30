import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {Product} from '../../types/product'

interface cartItem extends Product {
    quantity: number;
}

interface CartState {
    items: cartItem[];
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        loadCart : (state, action: PayloadAction<cartItem[]>) => {
            state.items = action.payload
        }
        


    },
})
export const { addTocart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart , loadCart } = cartSlice.actions;
export default cartSlice.reducer
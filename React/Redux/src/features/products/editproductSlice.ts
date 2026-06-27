import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Product} from '../../types/product'

interface EditProductState {
    isOpen: boolean;
    selectedProduct: Product | null;
}

const initialState: EditProductState = {
    isOpen: false,
    selectedProduct: null,

}

const editProductSlice = createSlice({

    name: 'editProduct',
    initialState,
    reducers: {
        openEditProduct: (state, action: PayloadAction<Product>) => {
            state.isOpen = true;
            state.selectedProduct = action.payload;
        },
        closeEditProduct: (state) => {
            state.isOpen = false;
            state.selectedProduct = null;
        },

    },


})
export const {openEditProduct, closeEditProduct ,} = editProductSlice.actions;
export default editProductSlice.reducer
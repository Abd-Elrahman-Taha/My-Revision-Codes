import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/products/cartSlice'
import editProductReducer from '../features/products/editproductSlice'

export const store = configureStore({ 
    reducer: {
        product: productReducer,
        cart: cartReducer,
        editProduct: editProductReducer,

    },

})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
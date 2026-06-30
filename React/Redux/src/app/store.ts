import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/products/cartSlice'
import editProductReducer from '../features/products/editproductSlice'
import searchReducer from '../features/products/searchSlice'
import sortReducer from '../features/products/sortSlice'

export const store = configureStore({ 
    reducer: {
        product: productReducer,
        cart: cartReducer,
        editProduct: editProductReducer,
        search: searchReducer,
        sort: sortReducer

    },

})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/products/cartSlice'
import editProductReducer from '../features/products/editproductSlice'
import searchReducer from '../features/products/searchSlice'
import sortReducer from '../features/products/sortSlice'
import authReducer from '../features/products/auth/authSlice'
import checkoutReducer from '../features/products/checkoutSlice'
import orderReducer from '../features/products/orderSlice'

export const store = configureStore({ 
    reducer: {
        product: productReducer,
        cart: cartReducer,
        editProduct: editProductReducer,
        search: searchReducer,
        sort: sortReducer,
        auth: authReducer,
        checkout: checkoutReducer,
        orders: orderReducer,

    },

})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
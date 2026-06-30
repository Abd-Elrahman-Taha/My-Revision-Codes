import {type AuthState } from './authTypes'
import {loginUser} from './authThunk'
import {createSlice} from '@reduxjs/toolkit'

const initialState: AuthState = {
    user: null,
    loading: "idle",
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem("user")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.user = action.payload;

            localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message || "Something went wrong";
        });
    }
    
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
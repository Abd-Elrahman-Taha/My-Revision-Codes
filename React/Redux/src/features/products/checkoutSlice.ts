import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface checkoutInfo{
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
    paymentMethod: string;
} 

interface checkoutState{
    checkoutInfo: checkoutInfo;
    loading: "idle" | "pending" | "succeeded" | "failed";
    isCheckoutComplete: boolean;
}

const initialState: checkoutState = {
    checkoutInfo: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        email: "",
        paymentMethod: "",
    },
    loading: "idle",
    isCheckoutComplete: false,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCheckoutInfo: (state, action: PayloadAction<checkoutInfo>) => {
            state.checkoutInfo = action.payload;
        },
        completeCheckout: (state) => {
            state.isCheckoutComplete = true;
        },
        resetCheckout: (state) => {
            state.checkoutInfo = initialState.checkoutInfo;
            state.isCheckoutComplete = false;
        },
    },
});

export default checkoutSlice.reducer;
export const { setCheckoutInfo, completeCheckout, resetCheckout } = checkoutSlice.actions;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
}

const savedOrders = localStorage.getItem("orders");

const initialState: OrderState = {
  orders: savedOrders ? JSON.parse(savedOrders) : [],
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    placeOrder: (
      state,
      action: PayloadAction<{
        userId: number;
        items: OrderItem[];
        total: number;
      }>
    ) => {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        userId: action.payload.userId,
        items: action.payload.items,
        total: action.payload.total,
        status: "Processing",
        createdAt: new Date().toISOString(),
      };

      state.orders.unshift(newOrder);

      saveOrders(state.orders);
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>
    ) => {
      const order = state.orders.find(
        (o) => o.id === action.payload.orderId
      );

      if (order) {
        order.status = action.payload.status;

        saveOrders(state.orders);
      }
    },

    cancelOrder: (
      state,
      action: PayloadAction<string>
    ) => {
      const order = state.orders.find(
        (o) => o.id === action.payload
      );

      if (order) {
        order.status = "Cancelled";

        saveOrders(state.orders);
      }
    },

    deleteOrder: (
      state,
      action: PayloadAction<string>
    ) => {
      state.orders = state.orders.filter(
        (o) => o.id !== action.payload
      );

      saveOrders(state.orders);
    },

    loadOrders: (
      state,
      action: PayloadAction<Order[]>
    ) => {
      state.orders = action.payload;
    },

    clearOrders: (state) => {
      state.orders = [];

      localStorage.removeItem("orders");
    },
  },
});

export const {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
  loadOrders,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type LoginData } from "./authTypes";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );

      return {
        ...response.data,
        role:
          response.data.username === "emilys"
            ? "admin"
            : "user",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);
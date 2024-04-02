import { createSlice } from "@reduxjs/toolkit";
import { AuthData } from "../utils/type";

const initialState: AuthData = {
  admin: localStorage.getItem("adminAuth")
    ? JSON.parse(localStorage.getItem("adminAuth") as string)
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload;
    },

    adminLogout: (state) => {
      state.admin = null;
      localStorage.removeItem("adminAuth");
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;

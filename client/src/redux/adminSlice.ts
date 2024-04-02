import { createSlice } from "@reduxjs/toolkit";
import { AuthData } from "../utils/type";

const initialState: AuthData = {
  admin: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
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
      localStorage.removeItem("auth");
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;

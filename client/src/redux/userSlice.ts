import { createSlice } from "@reduxjs/toolkit";
import { AuthData } from "../utils/type";

const initialState: AuthData = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;

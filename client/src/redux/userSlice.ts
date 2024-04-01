import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
};

type AuthData = {
  user: User | null;
  userImg: string;
};

const initialState: AuthData = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null,
  userImg: localStorage.getItem("userImg")
    ? (localStorage.getItem("userImg") as string)
    : "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    updateImg: (state, action) => {
      state.userImg = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout, updateImg } = userSlice.actions;
export default userSlice.reducer;

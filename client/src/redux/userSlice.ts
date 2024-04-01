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
};

const initialState: AuthData = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

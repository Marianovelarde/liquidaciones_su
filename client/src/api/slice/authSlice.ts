import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem("auth");

const initialState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      token: null,
      expiresAt: null,
    };

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action
    ) => {
      state.user = action.payload.user;

      state.token = action.payload.token;

      state.expiresAt =
        action.payload.expiresAt;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
          expiresAt:
            action.payload.expiresAt,
        })
      );
    },

    logout: (state) => {
      state.user = null;

      state.token = null;

      state.expiresAt = null;

      localStorage.removeItem("auth");
    },
  },
});

export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
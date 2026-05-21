import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  expiresAt: string | null;
}

const getInitialState = (): AuthState => {
  try {
    const savedAuth =
      localStorage.getItem("auth");

    if (!savedAuth) {
      return {
        user: null,
        token: null,
        expiresAt: null,
      };
    }

    const parsed =
      JSON.parse(savedAuth);

    // Si no hay token válido
    if (!parsed?.token) {
      localStorage.removeItem("auth");

      return {
        user: null,
        token: null,
        expiresAt: null,
      };
    }

    // Verificar expiración
    if (
      parsed?.expiresAt &&
      new Date(parsed.expiresAt).getTime() <
        Date.now()
    ) {
      localStorage.removeItem("auth");

      return {
        user: null,
        token: null,
        expiresAt: null,
      };
    }

    return {
      user: parsed.user || null,
      token: parsed.token || null,
      expiresAt:
        parsed.expiresAt || null,
    };
  } catch (error) {
    console.error(
      "Error parsing auth:",
      error
    );

    localStorage.removeItem("auth");

    return {
      user: null,
      token: null,
      expiresAt: null,
    };
  }
};

const initialState: AuthState =
  getInitialState();

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action
    ) => {
      state.user =
        action.payload.user;

      state.token =
        action.payload.token;

      state.expiresAt =
        action.payload.expiresAt;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token:
            action.payload.token,
          expiresAt:
            action.payload
              .expiresAt,
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
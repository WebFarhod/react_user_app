/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/user";

export interface AuthState {
  data: IUser;
  isLoading: boolean;
  loggedIn: boolean;
  error: string | null;
  state: string;
}

const initialState: AuthState = {
  data: {
    user: {
      sub: "",
      username: "",
      email: "",
      role: "",
    },
    accessToken: localStorage.getItem("accessToken"),
  },
  isLoading: false,
  loggedIn: !!localStorage.getItem("token"),
  error: null,
  state: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signUpUserSuccess(state) {
      state.isLoading = false;
    },
    signUserSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.loggedIn = true;
      state.data.accessToken = action.payload.accessToken;
      state.data = action.payload;
      state.error = null;
      action.payload.accessToken &&
        localStorage.setItem("accessToken", action?.payload?.accessToken);
    },

    signUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    refreshUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      localStorage.removeItem("accessToken");
    },

    logoutUser(state) {
      localStorage.removeItem("accessToken");
      state.loggedIn = false;
      state.isLoading = false;
      state.data = {
        user: { sub: "", username: "", email: "", role: "" },
        accessToken: null,
      };
      state.error = null;
      state.state = "";
    },
  },
});

export const {
  signUserStart,
  signUpUserSuccess,
  signUserSuccess,
  signUserFailure,
  refreshUserFailure,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;

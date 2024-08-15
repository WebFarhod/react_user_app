/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppThunk } from "../index";
import {
  signUserStart,
  signUpUserSuccess,
  signUserFailure,
  signUserSuccess,
  logoutUser,
  refreshUserFailure,
} from "../slices/authSlice";
import axiosInstance from "../../service/api";
import { ISignupFormValues } from "../../interface/singup";
import { enqueueSnackbar } from "../slices/snackbar";
import { ILoginFormValues } from "../../interface/login";

export const register =
  (data: ISignupFormValues): AppThunk =>
  async (dispatch) => {
    dispatch(signUserStart());
    try {
      await axiosInstance.post("/auth/register", data);
      dispatch(
        enqueueSnackbar({
          message: "User successfully registered. Awaiting verification.",
          options: { variant: "success" },
        })
      );
      dispatch(signUpUserSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
      dispatch(signUserFailure(errorMessage));
    }
  };

export const login =
  (data: ILoginFormValues): AppThunk =>
  async (dispatch) => {
    dispatch(signUserStart());
    try {
      const response = await axiosInstance.post("/auth/login", data);
      dispatch(
        enqueueSnackbar({
          message: "Login user",
          options: { variant: "success" },
        })
      );
      dispatch(signUserSuccess(response.data));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
      dispatch(signUserFailure(errorMessage));
    }
  };

export const refreshUser = (): AppThunk => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/auth/refresh");
    dispatch(signUserSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch(
      enqueueSnackbar({
        message: errorMessage,
        options: { variant: "error" },
      })
    );
    dispatch(refreshUserFailure(errorMessage));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(
    enqueueSnackbar({
      message: "logout successfully",
      options: { variant: "success" },
    })
  );
  dispatch(logoutUser());
};

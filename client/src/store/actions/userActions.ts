/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppThunk } from "../index";
import { setUserData } from "../slices/userSlice";
import $api from "../../service/auth";
import { enqueueSnackbar } from "../slices/snackbar";

export const deleteUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await $api.delete(`/user/delete/${id}`);
      console.log("====================================");
      console.log("re", res.data);
      console.log("====================================");
      dispatch(
        enqueueSnackbar({
          message: res.data,
          options: { variant: "success" },
        })
      );
      await $api
        .get(`/user/read-all`)
        .then((userRes) => dispatch(setUserData(userRes.data)));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
    }
  };

export const approvUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await $api.post(`/user/approv/${id}`);
      dispatch(
        enqueueSnackbar({
          message: res.data,
          options: { variant: "success" },
        })
      );
      await $api
        .get(`/user/read-all`)
        .then((userRes) => dispatch(setUserData(userRes.data)));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
    }
  };

export const disableUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await $api.post(`/user/disable-user/${id}`);
      dispatch(
        enqueueSnackbar({
          message: res.data,
          options: { variant: "success" },
        })
      );
      await $api
        .get(`/user/read-all`)
        .then((userRes) => dispatch(setUserData(userRes.data)));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
    }
  };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarMessage, OptionsObject } from "notistack";

export interface ISnackbarState {
  messages: { message: SnackbarMessage; options?: OptionsObject }[];
}

const initialState: ISnackbarState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: "snackbars",
  initialState,
  reducers: {
    enqueueSnackbar: (
      state: ISnackbarState,
      action: PayloadAction<{
        message: SnackbarMessage;
        options?: OptionsObject;
      }>
    ) => {
      state.messages.push(action.payload);
    },
    removeSnackbar: (state: ISnackbarState) => {
      state.messages.shift();
    },
  },
});

export const { enqueueSnackbar, removeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

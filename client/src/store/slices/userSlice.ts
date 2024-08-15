import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../interface/userData";

interface AuthState {
  users: UserData[];
}

const initialState: AuthState = { users: [] };

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData[]>) {
      state.users = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;

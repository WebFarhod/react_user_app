/* eslint-disable react-hooks/exhaustive-deps */
import Snackbar from "./components/snackbar/Snankbar";
import Router from "./routes/section";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { refreshUser } from "./store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const checkAuth = async () => {
    dispatch(refreshUser());
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    checkAuth();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Snackbar />
      <Router />
    </ThemeProvider>
  );
}

export default App;

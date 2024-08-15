/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/index";
import { ILoginFormValues } from "../interface/login";
import { login } from "../store/actions/authActions";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit } = useForm<ILoginFormValues>();
  const { isLoading, loggedIn } = useTypedSelector((state) => state.auth);

  const onSubmit = (data: ILoginFormValues) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sizes="20"
          sx={{ m: 1, bgcolor: "primary.main", width: 50, height: 50 }}
        >
          <LockOutlinedIcon fontSize="medium" />
        </Avatar>
        <Typography variant="h4">Login</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2 }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                margin="normal"
                fullWidth
                variant="filled"
                type="email"
                required
                label="Email"
                autoComplete="email"
                autoFocus
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                margin="normal"
                fullWidth
                variant="filled"
                type="password"
                required
                id="password"
                autoComplete="current-password"
                name="password"
                label="Password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {isLoading ? (
            <Button
              type="button"
              fullWidth
              disabled
              variant="contained"
              sx={{ mt: 3, mb: 2, gap: 5, mx: "auto" }}
            >
              <CircularProgress size={20} />
              loading
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          )}
          <Grid item xs={12} display={"flex"} justifyContent="end">
            <Link to="/register">Don't have an account? Sign Up</Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

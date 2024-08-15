/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/authActions";
import { ISignupFormValues } from "../interface/singup";
import { AppDispatch, RootState } from "../store/index";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useTypedSelector((state) => state.auth);

  const { control, handleSubmit, reset } = useForm<ISignupFormValues>();

  const onSubmit = (data: ISignupFormValues) => {
    dispatch(register(data));
    reset();
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

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
        <Typography variant="h4">Register</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2 }}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: "Username is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                margin="normal"
                fullWidth
                label="Username"
                variant="filled"
                type="text"
                required
                autoComplete="user"
                name="user"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
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
                id="email"
                label="Email"
                variant="filled"
                type="email"
                required
                autoComplete="email"
                name="email"
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
              <CircularProgress color="info" size={20} />
              Loading
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          )}
          <Grid item xs={12} display={"flex"} justifyContent="end">
            <Link to="/login">Already have an account? Login</Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

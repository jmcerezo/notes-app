import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "./Copyright";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import api from "../api/notes";
import {
  toastLoginParams,
  toastPromiseOptions,
  toastErrorOptions,
} from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    let isValid;

    if (email === "") {
      setEmailError("Enter your email address.");
      setEmailIsValid(true);
      isValid = false;
    } else {
      setEmailError("");
      setEmailIsValid(false);
      isValid = true;
    }

    return isValid;
  };

  const validatePassword = (password: string) => {
    let isValid;

    if (password === "") {
      setPasswordError("Enter your password.");
      setPasswordIsValid(true);
      isValid = false;
    } else {
      setPasswordError("");
      setPasswordIsValid(false);
      isValid = true;
    }

    return isValid;
  };

  const validateForm = () => {
    validateEmail(email);
    validatePassword(password);

    return validateEmail(email) && validatePassword(password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "email") {
      setEmail(event.target.value);
      validateEmail(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
      validatePassword(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { email, password };
    const formIsValid = validateForm();

    if (formIsValid) {
      const promise = api.post("auth/login", data).then((res) => {
        console.log(res.status);

        setEmail("");
        setPassword("");

        const token = res.data.token;
        const { exp } = Object(jwtDecode(token));
        const expires = new Date(exp * 1000);
        Cookies.set("token", token, { expires, secure: true });

        navigate("/");
      });

      toast
        .promise(promise, toastLoginParams, toastPromiseOptions)
        .catch((err) => {
          const errorMessage = err.response
            ? err.response.data.message
            : err.message;

          toast.error(errorMessage, toastErrorOptions);
        });
    }
  };

  return (
    <>
      <ToastContainer hideProgressBar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/david-travis-note-taking-unsplash.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <NotesOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login to your account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                autoComplete="email"
                id="email"
                onChange={handleChange}
                value={email}
                helperText={emailError}
                error={emailIsValid}
              />
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={passwordIsValid}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  autoComplete="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="error">{passwordError}</FormHelperText>
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                    onClick={() => navigate("/signup")}
                  >
                    No account yet? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

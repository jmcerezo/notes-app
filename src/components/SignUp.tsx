import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "./Copyright";
import axios from "axios";
import { NOTES_API } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [nameIsError, setErrorName] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [emailIsError, setErrorEmail] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [passwordIsError, setErrorPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const navigate = useNavigate();

  const validateName = (name: string) => {
    const alphabetRegex = /^[A-Za-z]+$/;
    const minThreeCharactersRegex = /(.*[a-z]){3}/i;
    let isValid;

    if (name === "") {
      setNameError("This is required.");
      setErrorName(true);
      isValid = false;
    } else if (!alphabetRegex.test(name)) {
      setNameError("Your name should not contain numbers.");
      setErrorName(true);
      isValid = false;
    } else if (!minThreeCharactersRegex.test(name)) {
      setNameError("Enter at least three characters.");
      setErrorName(true);
      isValid = false;
    } else {
      setNameError("");
      setErrorName(false);
      isValid = true;
    }

    return isValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    let isValid;

    if (email === "") {
      setEmailError("This is required.");
      setErrorEmail(true);
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email address.");
      setErrorEmail(true);
      isValid = false;
    } else {
      setEmailError("");
      setErrorEmail(false);
      isValid = true;
    }

    return isValid;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    let isValid;

    if (password === "") {
      setPasswordError("This is required.");
      setErrorPassword(true);
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
      );
      setErrorPassword(true);
      isValid = false;
    } else {
      setPasswordError("");
      setErrorPassword(false);
      isValid = true;
    }

    return isValid;
  };

  const validateForm = () => {
    validateName(name);
    validateEmail(email);
    validatePassword(password);

    return (
      validateName(name) && validateEmail(email) && validatePassword(password)
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "name") {
      setName(event.target.value);
      validateName(event.target.value);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
      validateEmail(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
      validatePassword(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `${NOTES_API}/auth/signup`;
    const user = { name, email, password };
    const formIsValid = validateForm();

    if (formIsValid) {
      const signUpToast = toast.loading("Signing up...", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "loading",
      });

      axios
        .post(url, user)
        .then((res) => {
          console.log(res);

          setTimeout(() => {
            toast.dismiss(signUpToast);
            toast.success("You have successfully created an account.", {
              position: toast.POSITION.TOP_CENTER,
              toastId: "success-message",
            });

            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }, 3000);
        })
        .catch((err) => {
          toast.dismiss(signUpToast);
          console.log(err);
          const errorMessage = err.response.data.message;

          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
            toastId: "error-message",
          });
        });
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <NotesOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  autoComplete="name"
                  id="name"
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  value={name}
                  helperText={nameError}
                  error={nameIsError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  autoComplete="email"
                  id="email"
                  name="email"
                  label="Email Address"
                  onChange={handleChange}
                  value={email}
                  helperText={emailError}
                  error={emailIsError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  error={passwordIsError}
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ fontWeight: "bold", textDecoration: "none" }}
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

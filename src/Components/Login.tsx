import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TransitionsModal from "./TransitionsModal.tsx";
import NavBar from "./NavBar.tsx";
import { credsLogin } from "./redux/reducers/loginReducer.tsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface RootState {
  ModalPoper: {
    value: boolean;
    // Other properties if present in your state
  };
}

export default function SignIn() {
  // const ModalCall = useSelector((state: RootState) => state.ModalPoper.value);
  // console.log(ModalCall);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [popOpen, setPopOpen] = React.useState(false);
  const [ModalCall, ModalCallChange] = React.useState(false);
  // const [invalidLoginCreds, setInvalidLoginCreds] = React.useState(false);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const localStorageSignUpUserData = localStorage.getItem("userData");
    console.log(localStorageSignUpUserData);
    if (localStorageSignUpUserData) {
      // console.log("email : ", email);
      // console.log("password : ", password);
      const data = new FormData(event.currentTarget);
      const fillCreds = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const { email, password } = fillCreds;
      console.log("email : ", email);
      console.log("password : ", password);

      if (email === "") {
        alert("First name is Required!!!");
      } else if (password === "") {
        alert("Password is Required!!!");
      } else {
        const userDataGetted = JSON.parse(localStorageSignUpUserData);
        if (localStorageSignUpUserData && localStorageSignUpUserData.length) {
          const userLogin = [userDataGetted].filter((elem, key) => {
            return elem.email === email && elem.password === password;
          });
          console.log(userLogin);
          if (userLogin.length === 0) {
            // setInvalidLoginCreds(true);
            // setTimeout(() => {
            //   setInvalidLoginCreds(false);
            // }, 3000);
            dispatch(credsLogin());
            toast.error("setInvalidLoginCreds!!!");
            console.log("setInvalidLoginCreds!!!");
            // alert("Invalid Details");
            // setOpen(true);
            // ModalCallChange(true)
          } else {
            toast.success("User Login Successfully");
            console.log("User Login Successfully");
            localStorage.setItem(
              "user_creds_details",
              JSON.stringify(userLogin)
            );
            navigate("/dashboard");
          }
        }
      }
    } else {
      if (!localStorageSignUpUserData) {
        toast.error("User Needs To SignIn First");
        console.log("Not Found Any Data In localStorageSignUpUserData");
        dispatch(credsLogin());
        // setTimeout(() => {
        //   dispatch(credsLogin());
        // }, 3000);
        // console.log(ModalCall);
        // localStorage.setItem("loginError", JSON.stringify(ModalCall));
        // alert("No user find, Please SignUp First!!");
      }
    }
  };
  interface MyComponentProps {
    ModelErrors: {
      SignInError: string;
      SignInFields: string;
      // InvalidLoginCreds: boolean;
      // setInvalidLoginCreds: Function;
    };
  }

  // const errorData = {
  //   SignInError: "SignIn Error",
  //   SignInFields: "No user found, Please SignUp First!!"
  // };

  return (
    <>
      <NavBar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          {ModalCall === true ? (
            <TransitionsModal
              ModelErrors={{
                SignInError: "User Needs to Signup First",
                SignInFields: "Please Create your Account.",
              }}
            />
          ) : (
            ""
          )}
          {ModalCall === true ? (
            <TransitionsModal
              ModelErrors={{
                SignInError: "Invalid Data",
                SignInFields: "Please Enter correct credentials!!!",
                // invalidPopUpOpen: invalidLoginCreds,
                // setInvalidLoginCreds: setInvalidLoginCreds,
              }}
            />
          ) : (
            ""
          )}

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
              {" "}
              f
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="/">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      {/* {isLoggedIn ? <Outlet /> : ""} */}
    </>
  );
}

// export { Login };

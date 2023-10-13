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

// function Login() {}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
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
            alert("Invalid Details");
          } else {
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
      alert("No user find, Please SignUp First!!");
    }
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
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

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TransitionsModal from "./TransitionsModal.tsx";
import NavBar from "./NavBar.tsx";
import { credsLogin } from "./redux/reducers/loginReducer.tsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp(userNotFoud) {
    const [isOpen, setIsopen] = React.useState(false);
    const navigate = useNavigate();
    // const [userData, setUserdata] = React.useState([])
    const location = useLocation();

    // Access the URL path
    const currentPath = location.pathname;
    console.log(currentPath);
    if (currentPath === "/dashboard") {
        toast.error("User Not Found!!!");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsopen(true)
        console.log("isOpen : ", isOpen);

        const data = new FormData(event.currentTarget);
        // console.log(data);
        const dataObj = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password')
        }
        // console.log(dataObj);
        const { firstName, lastName, email, password } = dataObj;
        setIsopen(true);
        // () ?  : () ?  : () ? : () ? : () ?  : () ?  : 
        // alert("User Created Successfully!!!");
        if (firstName === "") {
            toast.error("First name is Required!!!");
        } else if (lastName === "") {
            toast.error("Last name is Required!!!");

        } else if (email === "") {
            toast.error("Email is Required!!!");
        } else if (!email.includes("@")) {
            toast.error("Enter an valid email address!!!");
        } else if (password === "") {
            toast.error("Password field is required!!!");
        } else if (password.length < 5) {
            toast.error("password lenght will greater than five");
        } else {
            localStorage.setItem('userData', JSON.stringify(dataObj));

            if (firstName && lastName && email && password) {
                // toast.success("");
                setIsopen(true);
                setTimeout(() => {
                    setIsopen(false);
                    console.log(isOpen)
                }, 3000);
                console.log(isOpen);
                toast.success("User Created Successfully!!!");
                console.log("User Created Successfully!!!");
                localStorage.setItem("SignUp User", JSON.stringify(isOpen));
                navigate("/")
            }
        }

        // navigate('');
        // if (dataObj) {
        //     setPopOpen(true);
        //     setTimeout(() => {
        //         setPopOpen(false);
        //     }, 3000);
        //     console.log(popOpen);
        //     localStorage.setItem("SignUp User", JSON.stringify(popOpen));
        //     navigate("/")
        // }

    };

    return (
        <>
            <NavBar />
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    {/* {isOpen === true ? (
                    <TransitionsModal
                        ModelErrors={{
                            SignInError: "User Created",
                            SignInFields: "User Created Successfully, Please SignIn to your Dashboard!!!",
                        }}
                    />
                ) : (
                    ""
                )} */}
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
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
                                    <Link to="/">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </>
    );
}
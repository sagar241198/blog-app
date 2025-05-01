import React from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography,
    Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import InputField from '../../components/generic/input'

import { FullScreenBackground, StyledContainer } from "./styled";
import { BACKEND_URl } from "../../utils/evironment";
import axios from "axios";
import { useAuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "../../components/generic/alert";



export default function LoginPage() {

    const [fields, setFields] = React.useState({ email: 'sagar@gmail.com', password: 'sagar@123' });
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = React.useState({
        open: false,
        message: '',
        severity: "success"
    });

    const login = () => {
        axios.post(BACKEND_URl + 'login', fields).then(data => {

            if (data.status === 200 && data.data) {
                setOpenAlert((pre => ({ ...pre, open: true, message: 'login success', severity: 'success' })));
                setAuth(data.data);
                sessionStorage.setItem('loggedInUser',JSON.stringify(data.data));
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        }).catch(e => {
            setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'success' })));
        });
    }

    return (
        <FullScreenBackground>
            {/* <CssBaseline /> */}
            <StyledContainer>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight="bold" color="white">
                        Login to Your Account
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }}>
                        <InputField label="Enter Email" setFields={setFields} field='email' fields={fields} />
                        <InputField label="Enter Password" setFields={setFields} field='password' fields={fields} />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                            onClick={() => login()}
                        >
                            Login
                        </Button>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <AlertSnackbar openAlert={openAlert} setOpen={setOpenAlert} />
            </StyledContainer>
        </FullScreenBackground>
    );
}

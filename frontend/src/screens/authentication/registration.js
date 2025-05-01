import React from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Typography,
    Link,
    CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import InputField from '../../components/generic/input'

import { FullScreenBackground, StyledContainer } from "./styled";
import { BACKEND_URl } from "../../utils/evironment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "../../components/generic/alert";
import { validateEmptyFileds } from "./utils";



export default function LoginPage() {

    const [fields, setFields] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = React.useState({
        open: false,
        message: '',
        severity: "success"
    });

    const submit = () => {
        const { confirmPassword, ...rest } = fields;
        const hasError = validateEmptyFileds(fields)
        if (hasError) {
            setOpenAlert((pre => ({
                ...pre, open: true,
                message: hasError,
                severity: 'errror'
            })));
            return;
        }
        axios.post(BACKEND_URl + 'register', rest).then(data => {
            if (data.status === 200 && data.data) {
                setOpenAlert((pre => ({
                    ...pre, open: true,
                    message: 'You signed up successfully!',
                    severity: 'success'
                })));
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        }).catch(e => {
            setOpenAlert((pre => ({
                ...pre,
                open: true,
                message: e.response.data.message,
                severity: 'success'
            })));
        });
    }

    return (
        <FullScreenBackground>
            <CssBaseline />
            <StyledContainer>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight="bold" color="white">
                        Create Your Account
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <InputField label="Enter Your Name" fields={fields} setFields={setFields} field='name' fieldType='text' />
                        <InputField label="Enter Email" fields={fields} setFields={setFields} field='email' fieldType='email' />
                        <InputField label="Enter Password" fields={fields} setFields={setFields} field='password' fieldType='password' />
                        <InputField label="Confirm Password" fields={fields} setFields={setFields} field='confirmPassword' />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                            onClick={() => submit()}
                        >
                            Sign Up
                        </Button>
                        <Grid container sx={{ mt: 2 }}>

                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Have an account!"}
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

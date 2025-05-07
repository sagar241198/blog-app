import React from 'react';
import {
    Drawer,
    Box,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton
} from '@mui/material';

import Home from '@mui/icons-material/Home';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Logout from '@mui/icons-material/LogoutOutlined';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SourceSharpIcon from '@mui/icons-material/SourceSharp';
import ShareIcon from '@mui/icons-material/Share';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

const Sidebar = ({
    openMenu,
    setOpenMenu,
    handleNavigation,
    setActiveOption,
    activeOption
}) => {
    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate();


    React.useEffect(() => {
        setActiveOption(window.location.pathname)
    }, [window.location])
    const userLogout = () => {
        sessionStorage.clear();
        setAuth(null);
        navigate('/login');
    }
    return (
        <Drawer
            anchor="left"
            open={openMenu}
        >
            <Box sx={{ p: 2, bgcolor: '#b2ebf2', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar alt="User" src="https://i.pravatar.cc/300" />
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{auth ? auth.name : "Anonymous"}</Typography>
                    <Typography variant="caption" color="text.secondary">{auth ? auth.email : "Anonymous.com"}</Typography>
                </Box>

                <IconButton onClick={() => setOpenMenu(false)}>
                    <CloseSharpIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: 2, py: 1 }}>

                <List>
                    <ListItem button selected
                        sx={{ background: activeOption == "/" ? "lightgray" : "none" }}
                        onClick={() => handleNavigation('/')}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button
                        sx={{ background: activeOption == "/blogs" ? "lightgray" : "none" }}
                        onClick={() => handleNavigation('/blogs', { state: {} })}>
                        <ListItemIcon><SourceSharpIcon /></ListItemIcon>
                        <ListItemText primary="Blogs" />
                    </ListItem>
                    {!auth && (
                        <ListItem button
                            sx={{ background: activeOption == "/your-blogs" ? "lightgray" : "none" }}
                            onClick={() => handleNavigation('/your-blogs', { state: { userId: 1 } })}>
                            <ListItemIcon><ListAltSharpIcon /></ListItemIcon>
                            <ListItemText primary="Your Blogs" />
                        </ListItem>
                    )}
                    <ListItem button>
                        <ListItemIcon><ShareIcon /></ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {auth ? (
                        <>
                            <ListItem button
                                sx={{ background: activeOption == "/account" ? "lightgray" : "none" }}
                                onClick={() => handleNavigation('/account')}
                            >
                                <ListItemIcon><AccountCircleSharpIcon /></ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItem>
                            <ListItem button onClick={() => userLogout()}>
                                <ListItemIcon><Logout /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button
                                sx={{ background: activeOption == "/login" ? "lightgray" : "none" }}
                                onClick={() => handleNavigation('/login')}
                            >
                                <ListItemIcon><LockOpenSharpIcon /></ListItemIcon>
                                <ListItemText primary="Sign In" />
                            </ListItem>
                            <ListItem button
                                sx={{ background: activeOption == "/signup" ? "lightgray" : "none" }}
                                onClick={() => handleNavigation('/signup')}
                            >
                                <ListItemIcon><AppRegistrationSharpIcon /></ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>

        </Drawer>
    );
};

export default Sidebar;

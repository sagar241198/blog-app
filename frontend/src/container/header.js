import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import SidebarMenu from './header-drawer';


import Logo from '../assets/images/logo.webp'


const pages = [
    {
        lable: "Home",
        url: '/'
    },
    {
        lable: "All Blogs",
        url: '/blogs'
    },
    {
        lable: "Your Blog",
        url: '/your-blogs'
    }
]


function ResponsiveAppBar() {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ background: "black" }}>
                <Container maxWidth="xl">
                    <Toolbar>

                        <Avatar src={Logo} alt="logo" />

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => navigate(page.url)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.lable}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {!auth ? (
                                <>
                                    <Typography component='span' sx={{ mr: 1 }} onClick={() => navigate('/login')}>Sign In</Typography>
                                    <span>|</span>
                                    <Typography component='span' sx={{ ml: 1 }} onClick={() => navigate('/signup')}>Sign Up</Typography>
                                </>
                            ) : (
                                <>
                                    <Typography button component='li' sx={{ listStyle:'none', mr:1,cursor:'pointer' }} onClick={() => navigate('/account')}>Account</Typography>
                                    <Typography button component='button' sx={{ mr: 1 }} onClick={() => navigate('/login')}>Logout</Typography>
                                </>
                            )}

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <SidebarMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

        </>
    );
}
export default ResponsiveAppBar;

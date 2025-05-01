import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    Divider
} from '@mui/material';
import { useAuthContext } from '../../context/auth';

const AccountPage = () => {

    const { auth } = useAuthContext();

    const [user, setUser] = React.useState(null);

    console.log('auth--->',auth)

    React.useEffect(() => {
        if (!auth) return
        setUser(auth);
    }, [])

    return (
        <Container maxWidth="sm" sx={{ mt: 12 }}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                        src={user?.image || "https://i.pravatar.cc/150"}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        {user?.name || 'Anonymous'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {user?.email || 'Anonymous.com'}
                    </Typography>
                    <Divider sx={{ width: '100%', my: 2 }} />
                    <Typography variant="body1" color="text.primary">
                        Welcome to your account page.
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default AccountPage;

import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function AlertSnackbar({ openAlert, setOpen }) {
    const [state] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
    });


    const handleClose = () => {
        setOpen((pre) => ({ ...pre, open: false }));
    };

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={state}
                open={openAlert.open}
                severity={openAlert.severity}
                onClose={handleClose}
                message={openAlert.message}
                key={state.vertical + state.horizontal}
            />
        </Box>
    );
}

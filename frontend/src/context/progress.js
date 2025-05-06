
import { CircularProgress, Stack } from '@mui/material';
import React, { createContext, useContext } from 'react';
const ProgressContext = createContext();

// Custom hook to use the AuthContext
export const useProgress = () => {
    return useContext(ProgressContext);
};



export const ProgressProvider = ({ children }) => {

    const [progress, setProgress] = React.useState(false);

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
            {progress && (
                <div style={{
                    position: 'relative',
                    width: '100px',
                    margin: 'auto',
                    bottom: '430px'
                }}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <CircularProgress size="50px" color="secondary" />
                    </Stack>
                </div>
            )}
        </ProgressContext.Provider>
    )

}
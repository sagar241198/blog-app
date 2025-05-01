import { Box, Typography } from "@mui/material"

export const Footer = () => {
    return (
        <Box sx={{ bgcolor: "grey.900", color: "white", textAlign: "center", py: 3, mt: 5 }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} My Blog App. Built with ❤️ using React & Spring Boot.
            </Typography>
        </Box>
    )
}
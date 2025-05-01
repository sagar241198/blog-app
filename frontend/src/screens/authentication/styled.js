import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FullScreenBackground = styled(Box)(({ theme }) => ({
    backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/06/09/08/49/blog-1445367_1280.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.6)", // dark overlay
        zIndex: 1,
    },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
    position: "relative",
    zIndex: 2,
    backgroundColor: "transparent",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(5),
    boxShadow: theme.shadows[6],
    maxWidth: 400,
    color: "#ffff"
}));
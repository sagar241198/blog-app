import React from "react";
import {
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Stack,
    Divider,
    IconButton,
} from "@mui/material";
import { Comment as CommentIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SpringBootImage from '../../assets/docs-images/spring-boor.jpg'
import MuiImage from '../../assets/docs-images/mui.webp'
import NodeImage from '../../assets/docs-images/node-js.png'
import ReactImage from '../../assets/docs-images/react-js.svg'




const dummyBlogs = [
    {
        title: "Spring Boot with React",
        excerpt: "Learn how to integrate Spring Boot with React for seamless backend-frontend communication.",
        image: SpringBootImage,
        author: "John Doe",
        comments: 4,
        url: 'https://docs.spring.io/spring-boot/index.html'
    },
    {
        title: "Mastering MUI in React",
        excerpt: "Upgrade your UI with Material-UI components. Responsive, fast and beautiful.",
        image: MuiImage,
        author: "Jane Smith",
        comments: 2,
        url: "https://mui.com/material-ui/getting-started/"
    },
    {
        title: "Getting Started with Node.js",
        excerpt: "A beginner's guide to building scalable backend applications with Node.js and Express.",
        image: NodeImage,
        author: "Michael Green",
        comments: 5,
        url: "https://nodejs.org/docs/latest/api/"
    },
    {
        title: "Advanced React Patterns",
        excerpt: "Explore render props, higher-order components, and custom hooks to write better React code.",
        image: ReactImage,
        author: "Emily Clark",
        comments: 6,
        url: "https://react.dev/learn"
    },
];



export default function HomePage() {

    const navigate = useNavigate();

    const goToDocs = (link) => {
        window.location.href = link;
    }


    return (
        <>

            {/* Hero */}
            <Box
                sx={{
                    backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20191009/pngtree-geometric-abstract-background-with-blogs-image_318758.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    py: 10,
                    textAlign: "center",
                }}
            >
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Welcome to the Blogger's Space ✍️
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Explore inspiring stories, share your thoughts, and join the community!
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate('/add-post')}
                        startIcon={<EditIcon />}>
                        Write a Blog
                    </Button>
                </Container>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Recent Blogs */}
            <Box sx={{ m: 2 }}>
                <Typography variant="h5" gutterBottom>
                    📚 Latest Blogs
                </Typography>
                <Box container spacing={4} display="flex" justifyContent="space-between" flexWrap="wrap">
                    {dummyBlogs.map((blog, idx) => (
                        <Grid item key={idx} xs={12} md={6} sx={{ maxWidth: "350px", mt: 2, margin: "auto" }}>
                            <Card

                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: 4,
                                    marginTop: 1,
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia component="img" height="200" image={blog.image} onClick={() => goToDocs(blog.url)} />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {blog.excerpt}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                                        <Avatar>{blog.author.charAt(0)}</Avatar>
                                        <Typography variant="body2">{blog.author}</Typography>
                                        <Box flexGrow={1} />
                                        <IconButton size="small" disabled>
                                            <CommentIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2">{blog.comments}</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Box>
            </Box>
        </>
    );
}

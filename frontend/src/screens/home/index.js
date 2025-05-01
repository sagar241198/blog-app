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

const dummyBlogs = [
    {
        title: "Spring Boot with React",
        excerpt: "Learn how to integrate Spring Boot with React for seamless backend-frontend communication.",
        image: "https://miro.medium.com/v2/resize:fit:1200/1*o5FmjKTPdJTbhGE2MIjo6w.jpeg",
        author: "John Doe",
        comments: 4,
    },
    {
        title: "Mastering MUI in React",
        excerpt: "Upgrade your UI with Material-UI components. Responsive, fast and beautiful.",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl27lut6l48ceoa33rutc.jpg",
        author: "Jane Smith",
        comments: 2,
    },
    {
        title: "Getting Started with Node.js",
        excerpt: "A beginner's guide to building scalable backend applications with Node.js and Express.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
        author: "Michael Green",
        comments: 5,
    },
    {
        title: "Advanced React Patterns",
        excerpt: "Explore render props, higher-order components, and custom hooks to write better React code.",
        image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
        author: "Emily Clark",
        comments: 6,
    },
];



export default function HomePage() {


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
                    <Button variant="contained" color="secondary" size="large" startIcon={<EditIcon />}>
                        Write a Blog
                    </Button>
                </Container>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Recent Blogs */}
            <Box sx={{m:2}}>
                <Typography variant="h5" gutterBottom>
                    📚 Latest Blogs
                </Typography>
                <Box container spacing={4} display="flex" justifyContent="space-between" flexWrap="wrap">
                    {dummyBlogs.map((blog, idx) => (
                        <Grid item key={idx} xs={12} md={6} sx={{ maxWidth: "350px", mt:2 }}>
                            <Card

                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: 4,
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia component="img" height="200" image={blog.image} />
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

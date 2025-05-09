import React from "react";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import HomePage from "../../screens/home";
import BlogPage from "../../screens/blogs";
import LoginPage from "../../screens/authentication/login";
import RegisterPage from "../../screens/authentication/registration";
import ResponsiveAppBar from "../../container/header";
import { Footer } from "../../container/footer";
import { Box } from "@mui/material";
import AccountPage from "../../screens/account";
import CreatePost from "../../screens/blogs/create-blog";
import ViewBlog from "../../screens/blogs/view-blog";


const AppRoutes = () => {

    return (

        <Router>
            <Box sx={{ minHeight: '75vh' }}>
                <ResponsiveAppBar />

                <Box mt={6}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blogs" element={<BlogPage />} />
                        <Route path="/your-blogs" element={<BlogPage />} />
                        <Route path="/add-post" element={<CreatePost />} />

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<RegisterPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/view-post/:postId" element={<ViewBlog />} />

                        <Route path="/*" element={<HomePage />} />

                    </Routes>
                </Box>
            </Box>
            <div>
                <Footer />
            </div>
        </Router>
    )
}

export default AppRoutes
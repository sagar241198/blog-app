import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Tooltip,
    Divider,
} from "@mui/material";
import {
    AddCircleOutline as AddCircleIcon,
} from "@mui/icons-material";
import BlogDrawer from "./postForm";
import BlogCard from "./card";
import axios from "axios";
import { BACKEND_URl } from "../../utils/evironment";
import { useAuthContext } from "../../context/auth";
import AlertSnackbar from "../../components/generic/alert";

import EmptyPostIcon from '../../assets/images/empty-post.avif'
import { useLocation, useNavigate } from "react-router-dom";


export default function BlogPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", image: "", description: "" });
    const [allPost, setAllPost] = useState([]);
    const { auth } = useAuthContext();
    const [allCommentsLikes, setAllCommentsLikes] = useState([]);
    const [allPotsLikes, setAllPostsLikes] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        message: '',
        severity: "success"
    });
    const location = useLocation();

    const { userId = null } = location.state;

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };



    useEffect(() => {

        let url = 'post'
        if (userId) {
            url = 'post-by-user' + `/${userId}`
        }
        axios.get(BACKEND_URl + url)
            .then((data) => {
                if (data.status == 200) {
                    const formatedData = data.data.map((post) => ({ ...post, date: "April 20, 2025" }))
                    setAllPost(formatedData)
                }
            })
            .catch((err) => console.log('err---->', err));
    }, [drawerOpen]);

    const handleSave = () => {
        if (!auth) {
            setOpenAlert((pre) => ({ ...pre, open: true, message: "Please loging with your account!" }));
            return;
        } else {
            axios.post(BACKEND_URl + 'add-post', { ...newPost, user: auth.id })
                .then((data) => {
                    if (data.status == 200) {
                        setOpenAlert((pre) => ({ ...pre, open: true, message: "Post Added successfully!" }));
                        setDrawerOpen(false);
                    }
                })
                .catch((e) => {
                    setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'error' })));
                });
        }
    }

    const getAlltheCommenst = (() => {
        axios.get(BACKEND_URl + `comments`).then((data) => {
            if (data.status === 200) {
                setAllComments(data.data);
            }
        }).catch(e => console.log(e))
    })

    const getAllthePostLikes = (() => {
        axios.get(BACKEND_URl + `like-post`).then((data) => {
            if (data.status === 200) {
                setAllPostsLikes(data.data);
            }
        }).catch(e => console.log(e))
    })

    const getAlltheCommenstsLikes = (() => {
        axios.get(BACKEND_URl + `like-comment`).then((data) => {
            if (data.status === 200) {
                setAllCommentsLikes(data.data);
            }
        }).catch(e => console.log(e))
    })

    React.useEffect(() => {
        getAlltheCommenst();
        getAllthePostLikes();
        getAlltheCommenstsLikes();
    }, [])


    const likePost = (postId) => {
        axios.post(BACKEND_URl + 'like-post', { userId: auth.id, likedBy: auth.name, postId })
            .then((data) => {
                if (data.status == 200) {
                    setOpenAlert((pre) => ({ ...pre, open: true, message: "You Liked the Post!" }));
                    setDrawerOpen(false);
                    getAllthePostLikes();
                }
            })
            .catch((e) => {
                setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'error' })));
            });
    }

    const likeComments = (commentId) => {
        axios.post(BACKEND_URl + 'like-comment', { userId: auth.id, likedBy: auth.name, commentId })
            .then((data) => {
                if (data.status == 200) {
                    setOpenAlert((pre) => ({ ...pre, open: true, message: "You Liked the Comment!" }));
                    getAlltheCommenstsLikes();
                }
            })
            .catch((e) => {
                setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'error' })));
            });
    }

    return (
        <>
            <Box sx={{ bgcolor: "#f8f9fa", py: 3, width: '100%' }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
                        <Typography variant="h4" fontWeight="bold" fontSize={14}>
                            📰 Blogs
                        </Typography>
                        <Tooltip title="Create a new blog">
                            <Button
                                variant="contained"
                                startIcon={<AddCircleIcon />}
                                sx={{ borderRadius: 50, backgroundColor: "#1976d2" }}
                                onClick={() => navigate('/add-post')}
                            >
                                Create Blog
                            </Button>
                        </Tooltip>
                    </Box>
                    <Divider sx={{ mb: 1 }} />

                    <Box sx={{ height: "auto", overflow: "auto", p: 2 }}>

                        <Grid container spacing={2} className="sagar-class">
                            {allPost.map((blog, i) => (<div key={i}>
                                <BlogCard
                                    data={blog} i={i}
                                    commentsOfPost={allComments.filter((com => com.post === blog.id))}
                                    getAlltheCommenst={getAlltheCommenst}
                                    likePost={(id) => likePost(id)}
                                    likeComments={(id) => likeComments(id)}
                                    allCommentsLikes={allCommentsLikes}
                                    allPotsLikes={allPotsLikes.filter((pstLk) => pstLk.postId === blog.id)}
                                    user={auth}
                                    setOpenAlert={setOpenAlert}

                                />
                            </div>))}
                        </Grid>
                        {allPost.length == 0 && (
                            <div style={{ minHeight: '400px' }}>
                                <img src={EmptyPostIcon} alt="no blogs!" width={'100%'} height={'100%'} />
                                <Typography>No Blogs avialabe</Typography>
                            </div>
                        )}
                    </Box>
                </Container>
                {/* {drawerOpen && (
                    <BlogDrawer
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        newPost={newPost}
                        setNewPost={setNewPost}
                        handleSave={() => handleSave()}

                    />
                )} */}


            </Box>
            <AlertSnackbar openAlert={openAlert} setOpen={setOpenAlert} />
        </>

    );
}

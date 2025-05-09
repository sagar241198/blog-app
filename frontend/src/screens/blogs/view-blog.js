import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Grid,
    Typography,
    TextField,
    Button,
    Divider,
    Paper,
    Box,
    Stack,
    IconButton,
    Avatar,
    Card
} from '@mui/material';
import { BACKEND_URl } from '../../utils/evironment';
import axios from 'axios';
import { useAuthContext } from '../../context/auth';
import { Comment, Send } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { isUserLoggedIn } from './utils';
import AlertSnackbar from '../../components/generic/alert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



const ViewBlog = () => {
    const { postId } = useParams();
    const navigate= useNavigate();
    const [post, setPost] = useState(null);
    const { auth } = useAuthContext();
    const [allCommentsLikes, setAllCommentsLikes] = useState([]);
    const [allPotsLikes, setAllPostsLikes] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [postLikedByThisUser, setPostLikedByThisUser] = React.useState(0);
    const [newComment, setNewComment] = useState('');
    const [openAlert, setOpenAlert] = useState({
        open: false,
        message: '',
        severity: "success"
    });


    useEffect(() => {
        setPost(null);
        if (!postId) return;
        axios.get(BACKEND_URl + `post/${postId}`)
            .then((data) => {
                if (data.status == 200) {
                    const formatedData = data.data;
                    setPost({ ...formatedData, date: "April 20, 2025" })
                }
            })
            .catch((err) => console.log('err---->', err));
    }, [postId]);

    const getAlltheCommenst = (() => {
        axios.get(BACKEND_URl + `comments-by-post/${postId}`).then((data) => {
            if (data.status === 200) {
                setAllComments(data.data);
            }
        }).catch(e => console.log(e))
    })

    const getAllthePostLikes = (() => {
        axios.get(BACKEND_URl + `likes-by-post/${postId}`).then((data) => {
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

    useEffect(() => {
        if (!postId) return
        getAlltheCommenst();
        getAllthePostLikes();
        getAlltheCommenstsLikes();
    }, [postId])

    const handleAddComment = () => {
        if (!isUserLoggedIn(auth)) {
            setOpenAlert((pre => ({ ...pre, open: true, message: 'Please loggin', severity: 'error' })));
            return;
        }
        let data = {
            comment: newComment,
            user: auth.id,
            post: postId
        }
        axios.post(BACKEND_URl + `comments`, data)
            .then((data) => {
                if (data.status === 200 && data.data) {
                    setOpenAlert((pre => ({
                        ...pre, open: true,
                        message: 'Your Comments Added!',
                        severity: 'success'
                    })));
                    setNewComment('');
                    getAlltheCommenst()
                }
            })
            .catch((e) => {
                setOpenAlert((pre => ({
                    ...pre,
                    open: true,
                    message: e.response.data.message,
                    severity: 'error'
                })));
            });
    }

    const likeComments = (commentId) => {
        if (!isUserLoggedIn(auth)) {
            setOpenAlert((pre => ({ ...pre, open: true, message: 'Please loggin', severity: 'error' })));
            return;
        }
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

    const likePost = () => {
        if (!isUserLoggedIn(auth)) {
            setOpenAlert((pre => ({ ...pre, open: true, message: 'Please loggin', severity: 'error' })));
            return;
        }
        axios.post(BACKEND_URl + 'like-post', { userId: auth.id, likedBy: auth.name, postId })
            .then((data) => {
                if (data.status == 200) {
                    setOpenAlert((pre) => ({ ...pre, open: true, message: "You Liked the Post!" }));
                    getAllthePostLikes();
                }
            })
            .catch((e) => {
                setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'error' })));
            });
    }

    React.useEffect(() => {
        if (!auth) return
        let liked = allPotsLikes.filter((pl) => pl.userId === auth.id).length;
        setPostLikedByThisUser(liked);
    }, [allPotsLikes, auth])


    return (
        <>
            <Box p={2} mt={8} minHeight={"76vh"}>
                <Box textAlign='left'>
                    <IconButton onClick={() => navigate(-1)} sx={{fontSize:'14px'}}>
                        <KeyboardBackspaceIcon /> Back
                    </IconButton>
                </Box>
                <Grid container spacing={3}>
                    {post && (
                        <>
                            <Grid size={{ xs: 12, md: 6, maxWidth: '400px' }}>
                                <Card sx={{ padding: '10px' }}>
                                    <Typography variant="h4" gutterBottom>{post.title}</Typography>
                                    <Box component="img" src={post.image} alt="Post" width="100%" borderRadius={2} />
                                    <Typography variant="body1" mt={2} textAlign='left' fontSize='14px'>{post.description}</Typography>
                                </Card>
                            </Grid>

                            <Grid item size={{ xs: 12, md: 6, }} sx={{ minHeight: '400px', background: "lightgray", padding: '10px' }}>
                                <Box style={{ minHeight: '400px', overflowy: 'scroll' }} >

                                    <Box textAlign={'left'}>
                                        <IconButton aria-label="add to favorites"
                                            sx={{ fontSize: '14px', padding: '0px' }}
                                            onDoubleClick={() => likePost()}
                                        >
                                            {allPotsLikes.length}  <FavoriteIcon
                                                sx={{
                                                    color: postLikedByThisUser ? "#e53935" : "none",
                                                    ml: "auto",
                                                    fontSize: '16px'
                                                }}
                                            />
                                        </IconButton>

                                        <IconButton size="small" disabled>
                                            {allComments.length} <Comment fontSize="small" />
                                        </IconButton>

                                    </Box>

                                    <Divider sx={{ mb: 2 }} />


                                    <Stack spacing={1} mb={2}>
                                        {allComments.length > 0 && allComments.map((cmt, idx) => {
                                            let commentCounts = allCommentsLikes.filter((lkc) => lkc.commentId === cmt.id).length;
                                            let likesByThisUser = allCommentsLikes.filter((lkc) => lkc.userId === auth?.id &&
                                                lkc.commentId === cmt.id).length;
                                            return (
                                                <Box key={idx} sx={{ p: 1.5, boxShadow: 'none' }}>
                                                    <Stack direction="row" spacing={1}>
                                                        <Box>
                                                            <Avatar sx={{ width: 30, height: 30, bgcolor: "#1976d2", fontSize: 14 }}>
                                                                {cmt.commentedBy.charAt(0)}
                                                            </Avatar>
                                                        </Box>
                                                        <Box textAlign="left">
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {cmt.commentedBy}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                                {cmt.comment}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                                                                {"just now"}
                                                            </Typography>
                                                            <IconButton aria-label="add to favorites"
                                                                onClick={() => likeComments(cmt.id)}
                                                                sx={{ fontSize: '14px', padding: '0px' }}>
                                                                {commentCounts} <FavoriteIcon sx={{
                                                                    color: likesByThisUser > 0 ? "#e53935" : "gray", ml: "auto", fontSize: '16px'
                                                                }} />
                                                            </IconButton>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            )
                                        })}

                                    </Stack>
                                </Box>


                                <Stack direction="row" spacing={1} alignItems="center" padding={2} >
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <IconButton
                                        onClick={() => handleAddComment()}
                                    >
                                        <Send sx={{ color: "green" }} />
                                    </IconButton>
                                </Stack>

                            </Grid>
                        </>
                    )}
                </Grid>

            </Box >
            <AlertSnackbar openAlert={openAlert} setOpen={setOpenAlert} />
        </>

    );
};

export default ViewBlog;

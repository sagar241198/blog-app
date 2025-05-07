import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Paper, Stack, TextField, } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import { BACKEND_URl } from '../../utils/evironment';
import { useAuthContext } from '../../context/auth';
import AlertSnackbar from '../../components/generic/alert';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function BlogCard({
    data,
    commentsOfPost = [],
    getAlltheCommenst,
    likePost,
    likeComments,
    allCommentsLikes,
    allPotsLikes,
    user,
    setOpenAlert
}) {
    const [expanded, setExpanded] = React.useState(false);
    const [commentContent, setCommentContent] = React.useState('')

    const [comments, setAllComments] = React.useState([]);
    const { auth } = useAuthContext();
    const [postLikedByThisUser, setPostLikedByThisUser] = React.useState(0);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const handleAddComment = (post) => {
        let data = {
            comment: commentContent,
            user: auth.id,
            post: post.id
        }
        axios.post(BACKEND_URl + `comments`, data)
            .then((data) => {
                if (data.status === 200 && data.data) {
                    setOpenAlert((pre => ({
                        ...pre, open: true,
                        message: 'Your Comments Added!',
                        severity: 'success'
                    })));
                    setCommentContent('');
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

    React.useEffect(() => {
        setAllComments(commentsOfPost);
    }, [commentsOfPost]);

    React.useEffect(() => {

        let liked = allPotsLikes.filter((pl) => pl.userId === user.id).length;
        setPostLikedByThisUser(liked)

    }, [allPotsLikes])

    return (
        <>
            <Card

                sx={{
                    maxWidth: '400px',
                    minWidth:'350px',
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                    },
                }}
            >

                <Box display='flex' justifyContent='flex-start' padding={2}>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data.postedBy.charAt(0)}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography gutterBottom variant="h5" component="div" fontSize={14} sx={{ color: 'text.secondary' }}>
                            {data.postedBy}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" fontSize={14} sx={{ color: 'text.secondary' }}>
                            {data.date}
                        </Typography>
                    </Box>
                </Box>
                <Typography gutterBottom variant="h5" component="div" fontSize={14} textAlign='left' sx={{ padding: '0px 5px' }}>
                    {data.title}
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={data.image}
                        alt="Paella dish"
                    />
                </Box>

                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {data.description.slice(0, 50) + '.... see more'}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={() => likePost(data.id)} sx={{ fontSize: '14px' }}>
                        {allPotsLikes.length}  <FavoriteIcon sx={{
                            color: postLikedByThisUser ? "#e53935" : "none",
                            ml: "auto",
                            fontSize: '16px'
                        }} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Typography variant="body2">{commentsOfPost.length} Comments</Typography>
                    </IconButton>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Stack spacing={1} mb={2}>
                        {comments.length > 0 && comments.map((cmt, idx) => {
                            let commentCounts = allCommentsLikes.filter((lkc) => lkc.commentId === cmt.id).length;
                            let likesByThisUser = allCommentsLikes.filter((lkc) => lkc.userId === user?.id &&
                                lkc.commentId === cmt.id).length;
                            return (
                                <Paper key={idx} sx={{ p: 1.5, bgcolor: "#f9f9f9", boxShadow: 'none' }}>
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
                                            <IconButton aria-label="add to favorites" onClick={() => likeComments(cmt.id)} sx={{ fontSize: '14px' }}>
                                                {commentCounts} <FavoriteIcon sx={{
                                                    color: likesByThisUser > 0 ? "#e53935" : "gray", ml: "auto", fontSize: '16px'
                                                }} />
                                            </IconButton>
                                        </Box>
                                    </Stack>
                                </Paper>
                            )
                        })}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" padding={2}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Add a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <IconButton color="primary"
                            onClick={() => handleAddComment(data)}
                        >
                            <Send />
                        </IconButton>
                    </Stack>
                </Collapse>
            </Card>
        </>
    );
}

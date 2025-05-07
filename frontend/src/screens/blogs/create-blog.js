import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    Divider,
    IconButton
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ImageBox, ImageTag, ManinBox } from './styled';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import AlertSnackbar from '../../components/generic/alert';
import axios from 'axios';
import { BACKEND_URl } from '../../utils/evironment';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        message: '',
        severity: "success"
    });

    const [isSubmitEnable, setIsSubmitEnable] = useState(false);
    const [imageBlob, setImageBlob] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

        if (file.size <= 100 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBlob(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            resizeImage(file, 100 * 1024, (compressedBase64) => {
                setImageBlob(compressedBase64);
            });
        }
    };

    const resizeImage = (file, maxSize, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const scaleFactor = Math.sqrt((file.size / maxSize));
                width = width / scaleFactor;
                height = height / scaleFactor;

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            callback(reader.result);
                        };
                        reader.readAsDataURL(blob);
                    },
                    'image/jpeg',
                    0.7
                );
            };
        };
    };

    const handlePost = () => {
        const postData = {
            title,
            description: desc,
            image: imageBlob,
        };
        if (!auth) {
            setOpenAlert((pre) => ({ ...pre, open: true, message: "Please loging with your account!" }));
            return;
        } else {
            axios.post(BACKEND_URl + 'add-post', { ...postData, user: auth.id })
                .then((data) => {
                    if (data.status == 200) {
                        setOpenAlert((pre) => ({ ...pre, open: true, message: "Post Added successfully!" }));
                        setTimeout(() => {
                            navigate('/blogs');
                        }, 2000);
                    }
                })
                .catch((e) => {
                    setOpenAlert((pre => ({ ...pre, open: true, message: e.response.data.message, severity: 'error' })));
                });
        }
    };

    useEffect(() => {

        if (title && desc) {
            setIsSubmitEnable(true);
        } else { setIsSubmitEnable(false); }

    }, [title, desc])

    return (
        <>
            <Box display="flex" mt={5}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%' }}
                >
                    <ManinBox>
                        <CardContent>
                            <Box display='flex' justifyContent='flex-start'>
                                <IconButton onClick={() => navigate(-1)}>
                                    <KeyboardBackspaceIcon />
                                </IconButton>

                                <Typography variant="h5" gutterBottom fontWeight={600}>
                                    Create a New Blog Post
                                </Typography>
                            </Box>


                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <TitleIcon fontSize="small" />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Title *
                                </Typography>
                            </Box>
                            <TextField
                                placeholder="Enter blog title..."
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                                <ImageBox onClick={() => fileInputRef.current.click()}>
                                    {preview ? (<ImageTag src={preview} alt="Preview" />
                                    ) : (
                                        <>
                                            <ImageIcon color="action" fontSize="large" />
                                            <Typography ml={1} color="text.secondary">
                                                Click to upload image
                                            </Typography>
                                        </>
                                    )}
                                </ImageBox>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Box>

                            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
                                <DescriptionIcon fontSize="small" />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Description *
                                </Typography>
                            </Box>
                            <TextField
                                placeholder="Write your story..."
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                margin="dense"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />

                            <Button
                                variant="contained"
                                endIcon={<SendIcon fontSize="small" />}
                                fullWidth
                                sx={{ mt: 3, py: 1.5, borderRadius: 3 }}
                                onClick={() => handlePost()}
                                disabled={!isSubmitEnable}
                            >
                                Post Blog
                            </Button>
                        </CardContent>
                    </ManinBox>
                </motion.div>
            </Box>

            <AlertSnackbar openAlert={openAlert} setOpen={setOpenAlert} />
        </>
    );
};

export default CreatePost;

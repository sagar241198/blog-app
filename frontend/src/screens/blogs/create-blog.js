import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = () => {
    const postData = {
      title,
      description: desc,
      image,
    };
    console.log(postData);
    // Send to backend API
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            width: '100%',
            p: '5%',
            borderRadius: 4,
            boxShadow: 6,
            background: '#fdfdfd',
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Create a New Blog Post
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <TitleIcon fontSize="small" />
              <Typography variant="subtitle2" color="text.secondary">
                Title
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

            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
              <DescriptionIcon fontSize="small" />
              <Typography variant="subtitle2" color="text.secondary">
                Description
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

            <Divider sx={{ my: 2 }} />

            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon fontSize="small" />}
              >
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {preview && (
                <Avatar
                  variant="rounded"
                  src={preview}
                  alt="Preview"
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                />
              )}
            </Box>

            <Button
              variant="contained"
              endIcon={<SendIcon fontSize="small" />}
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: 3 }}
              onClick={handlePost}
            >
              Post Blog
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default CreatePost;

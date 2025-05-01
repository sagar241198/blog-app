import React from "react";
import {
    Box,
    Drawer,
    Typography,
    IconButton,
    Divider,
    Stack,
    Button,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputField, { InputField2 } from "../../components/generic/input";

export default function BlogDrawer({ open, onClose, newPost, setNewPost, handleSave }) {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: 320, sm: 400 },
                    height: "100%",
                    bgcolor: "#f0f2f5",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        📝 Create New Blog
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Form Container */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >

                    <InputField2 label="Post Title" setFields={setNewPost} field='title' fields={newPost} />
                    <InputField2 label="Image URL" setFields={setNewPost} field='image' fields={newPost} />
                    <InputField2 label="Post Content" setFields={setNewPost} field='description' fields={newPost} />


                    <Box sx={{ mt: "auto" }}>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                backgroundColor: "#1976d2",
                                borderRadius: 2,
                                py: 1.2,
                                '&:hover': {
                                    backgroundColor: "#1565c0",
                                },
                            }}
                            onClick={() => handleSave()}
                        >
                            Save Post
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Drawer>
    );
}

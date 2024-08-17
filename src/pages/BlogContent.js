import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { IconButton, Box, Typography, Card, CardContent, CardMedia, TextField, Button, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector} from "react-redux";
import toast from "react-hot-toast";

const BlogContent = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const username = useSelector((state) => state.username)||localStorage.getItem('username');
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const id = useParams().id;
  const navigate = useNavigate();
  const currentDate = new Date();

// Display the date in YYYY-MM-DD format
console.log(currentDate.toISOString().split('T')[0]);

  const getBlog = async () => {
    try {
      const { data } = await axios.get(`https://blog-backend-fono.onrender.com/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setComments(data?.blog.comment || []); // Assuming your blog object has a 'comments' field
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  const handleGoBack = () => {
    navigate('/blogs');
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
    //setUsername(user.username)
  };

  const handleSubmitComment = async () => {
    try {
      const response = await axios.post(`https://blog-backend-fono.onrender.com/api/v1/blog/add-comment/${id}`, { username:username , comment: commentInput ,Date: currentDate});
      if (response.data?.success) {
        setComments([...comments, response.data.comment]); // Assuming the API returns the newly added comment
        setCommentInput('');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComment = () => {
    if (isLogin) {
      handleSubmitComment();
    } else {
      toast.success("Please Login!");
      navigate('/register');
    }
  };

  return (
    <div>
      <Box
        width={"60%"}
        border={3}
        borderRadius={10}
        padding={2}
        margin="auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
        bgcolor="white"
      >
        <IconButton onClick={handleGoBack} style={{ alignSelf: 'flex-start', marginBottom: '-30px' }}>
          <ArrowBackIcon />
        </IconButton>
        {blog && (
          <Card>
            <Typography variant="h3" textAlign={"center"} component="div" sx={{fontWeight:'bold'}}>
              {blog.title}
            </Typography>
            <CardMedia
              component="img"
              height="194"
              image={blog.image}
              alt="Blog related image"
            />
            <CardContent>
              <Typography  variant="h6" fontFamily="Georgia, serif" color="black">
                {blog.content}
              </Typography>
            </CardContent>
          </Card>
        )}
        {/* <Divider style={{ marginTop: '20px', marginBottom: '20px' }} /> */}
        <Typography variant="h5" padding={1} component="div" textAlign="center" sx={{fontWeight:'bold'}}>
          Comments
        </Typography>
        {comments && comments.map((comment, index) => (
          <Card key={index} sx={{ marginTop: '10px' }}>
            <CardContent>
              <Typography variant="body1" color="black">
                {comment?.username}
                {/* {comment?.comment}
                {comment?.createAt} */}
              </Typography>
              <Typography variant="body1" color="black">
                {comment?.comment}
              </Typography>
              <Typography variant="body1" color="black">
                {comment?.createdAt}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <TextField
          label="Add a comment"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={commentInput}
          onChange={handleCommentInputChange}
          style={{ marginTop: '20px' }}
        />
        <Button variant="contained" onClick={handlePostComment} style={{ marginTop: '10px' }}>
          Post Comment
        </Button>
      </Box>
    </div>
  );
};

export default BlogContent;

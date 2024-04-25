import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import Editpage from "scenes/Editpage";
import { useNavigate } from "react-router-dom";

const DeleteEdit = ({ postId,picturePath,description,code }) => {
  const token = useSelector((state) => state.token);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const handleDelete = async () => {
    console.log(postId);
    try {
      const response = await fetch(`https://studentshubserver-eb5u4c2w3-itsaniket1s-projects.vercel.app/posts/delete/${postId}`, {
        method: "DELETE", // Changed to DELETE
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setPosts({ posts: data.reverse() })); // Ensure data.reverse() is the expected format
      } else {
        alert("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  
  
  return (
    <>
    {/* <img src="https://drive.google.com/thumbnail?id=1fR7V7svROj0Bi-TrG6iOBc6Eit0qSfGX&sz=w250" alt=""/> */}
      <IconButton onClick={handleDelete}>
        <DeleteOutlined />
      </IconButton>
      <IconButton  onClick={() => navigate(`/home/edit/${postId}`)} >
        <EditOutlined />
      </IconButton>
      
    </>
  );
};

export default DeleteEdit;

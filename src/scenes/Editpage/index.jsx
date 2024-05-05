import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MoreHorizOutlined,
  CodeOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import FlexBetween from "components/flexbetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useParams } from "react-router-dom";
const Editpage = () => {
  const dispatch = useDispatch();
  const {postId} = useParams();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [File, setFile] = useState(null);
  const [isCode, setIsCode] = useState(false);
  const [code, setCode] = useState("");
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const getPost=async()=>{
    const response = await fetch(
        `https://studentshubserver.vercel.app/edit/${postId}`,{
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    const post= await response.json();
  }

  return (
    <WidgetWrapper m="2rem 2rem" alignItems="center">
      <FlexBetween>

        <InputBase
          placeholder="What's on your mind..."
          multiline
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default Editpage;

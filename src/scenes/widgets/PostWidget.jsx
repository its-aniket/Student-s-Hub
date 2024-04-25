import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SendOutlined,
  DeleteOutlined,
  EditOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MoreHorizOutlined,
  CodeOutlined,
} from "@mui/icons-material";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import SharedOutlinedbutton from "./SharedOutlinedbutton";

import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  InputBase,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/flexbetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Dropzone from "react-dropzone";
import DeleteEdit from "./DeleteEdit";

const PostWidgets = ({
  postId,
  postUserId,
  name,
  description,
  code,
  University,
  picturePath,
  userPicturePath,
  answers: initialAnswers,
  likes,
  comments: initialComments,
  isProfile = false,
}) => {
  const loggedInUserName = `${useSelector(
    (state) => state.user.firstName
  )} ${useSelector((state) => state.user.lastName)}`;

  const loggedInUserPicturePath = useSelector(
    (state) => state.user.picturePath
  );
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleShowAllAnswers = () => {
    setShowAllAnswers(true);
  };
  const handleShowLessAnswers = () => {
    setShowAllAnswers(false);
  };
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isComments, setIsComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnPost = postUserId === loggedInUserId;
  const isLiked = Boolean([loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const comments = initialComments || [];
  const commentsCount = Object.keys(comments).length;
  const answers = initialAnswers || [];
  const [isAnswers, SetisAnswers] = useState(false);
  const [isAnsImage, setIsAnsImage] = useState(false);
  const [ansImage, setAnsImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerDescription, setAnswerDescription] = useState("");
  const [isAnsCode, setIsAnsCode] = useState(false);
  const [ansCode, setAnsCode] = useState("");
  const [isAnsFile, setIsAnsFile] = useState(null);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const mediumMain = palette.neutral.mediumMain;
  const filepath = `https://drive.google.com/thumbnail?id=${picturePath}&sz=w2000`;

  // const filepath=  `https://drive.google.com/open?id=${picturePath}`
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const handleAns = async () => {
    const formData = new FormData();
    formData.append("ansCode", ansCode);
    formData.append("AnsDescription", answerDescription);
    formData.append("userPicturePath", loggedInUserPicturePath);
    if (ansImage) {
      formData.append("picture", ansImage);
      formData.append("answerPicturePath", ansImage.name);
    }
    formData.append("name", loggedInUserName);

    // Append the file

    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/answer`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      console.log(response);
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setAnsCode("");
      setAnswer("");
      setAnsImage(null);
      SetisAnswers(false);
    } catch (error) {
      console.error("Error submitting ans:", error);
    }
  };
  const handleCommentSubmit = async () => {
    setIsSubmittingComment(true);
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            text: commentInput,
            name: loggedInUserName,
            userPicturePath: loggedInUserPicturePath, // Include the user's picture path
          }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsSubmittingComment(false);
      setCommentInput("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setIsSubmittingComment(false);
    }
  };
  
  return (
    <WidgetWrapper m="1rem 0.5rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={University}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem", whiteSpace: "pre-wrap" }}>
        {description}
      </Typography>

      {code && (
        <SyntaxHighlighter
          children={code}
          language="javascript, java, C,C++,HTML"
          showLineNumbers="true"
          maxwidth="470px"
          style={dracula}
          customStyle={{ borderRadius: "5px" }}
        />
      )}

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          loading="lazy" 
          // src={`https://drive.google.com/thumbnail?id=${picturePath}&sz=w1000`}
          src={filepath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{commentsCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => SetisAnswers(!isAnswers)}>
              <QuestionAnswerOutlinedIcon />
            </IconButton>
            <Typography>Ans</Typography>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="0.5rem">
          {isOwnPost && (
            <DeleteEdit
              postId={postId}
              picturePath={picturePath}
              description={description}
              code={code}
            />
          )}
          <IconButton>
            <SharedOutlinedbutton />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isAnswers && (
        <WidgetWrapper>
          <InputBase
            placeholder="Share you answer..."
            onChange={(e) => setAnswerDescription(e.target.value)}
            value={answerDescription}
            width="100%"
            multiline
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <FlexBetween gap="1.5rem">
            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween gap="1.5rem" m="1rem" alignContent="center">
              <FlexBetween
                gap="0.25rem"
                onClick={() => setIsAnsImage(!isAnsImage)}
              >
                <ImageOutlined sx={{ color: mediumMain }} />
                <Typography
                  color={mediumMain}
                  sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                >
                  Image
                </Typography>
              </FlexBetween>

              {isNonMobileScreens ? (
                <>
                  <FlexBetween
                    gap="0.25rem"
                    onClick={() => setIsAnsCode(!isAnsCode)}
                  >
                    <CodeOutlined sx={{ color: mediumMain }} />
                    <Typography
                      color={mediumMain}
                      sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                      Code
                    </Typography>
                  </FlexBetween>

                  <FlexBetween
                    gap="0.25rem"
                    onClick={() => setIsAnsFile(!isAnsFile)}
                  >
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography
                      color={mediumMain}
                      sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                      Attachment
                    </Typography>
                  </FlexBetween>
                  <Button
                    onClick={handleAns}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: palette.primary.main,
                      borderRadius: "3rem",
                    }}
                  >
                    Ans
                  </Button>
                </>
              ) : (
                <FlexBetween gap="0.25rem">
                  <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
              )}
            </FlexBetween>
          </FlexBetween>

          {isAnsImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setAnsImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!ansImage ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{ansImage.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {ansImage && (
                      <IconButton
                        onClick={() => setAnsImage(null)}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}
          {isAnsCode && (
            <Box
              border={`1px solid ${medium}`}
              maxwidth="500px"
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <SyntaxHighlighter
                children={ansCode}
                language="javascript"
                showLineNumbers="true"
                maxwidth="470px"
                style={dracula}
                customStyle={{ borderRadius: "5px" }}
              />

              <textarea
                placeholder="Enter your code here..."
                onChange={(e) => setAnsCode(e.target.value)}
                value={ansCode}
                rows={5} // Set the number of visible rows (adjust as needed)
                style={{
                  width: "100%", // This will ensure the textarea takes up the full width of the parent Box
                  resize: "vertical", // Allow vertical resizing of the textarea if needed
                  backgroundColor: palette.neutral.light,
                  borderRadius: "5px",
                  padding: "1rem 2rem",
                  border: "none", // Optionally remove border if not desired
                }}
              />
            </Box>
          )}
        </WidgetWrapper>
      )}
      {answers
        .slice(0, showAllAnswers ? answers.length : 1)
        .map((answer, i) => (
          <WidgetWrapper m="1rem 0">
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              sx={{ pl: "1rem", mt: "2rem" }}
            >
              <UserImage
                image={answer.userPicturePath}
                size="30px"
                sx={{ mr: "1rem" }}
              />
              <Box>
                <Typography variant="body2" sx={{ color: main, m: "0.5rem" }}>
                  {answer.name}
                </Typography>
              </Box>
            </Box>
            <br />
            <Box
              direction="row"
              overflow="hidden"
              marginLeft="60px"
              marginRight="60px"
              mt="0rem"
            >
              <Typography
                variant="body2"
                sx={{ color: main, whiteSpace: "pre-wrap" }}
              >
                {answer.AnsDescription}
              </Typography>
            </Box>
            {answer.ansCode && (
              <SyntaxHighlighter
                children={answer.ansCode}
                language="javascript, java, C,C++,HTML"
                showLineNumbers="true"
                maxwidth="470px"
                style={dracula}
                customStyle={{ borderRadius: "5px" }}
              />
            )}
            {answer.answerPicturePath && (
              <>
              
                <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                loading="lazy" 
                src={`https://drive.google.com/thumbnail?id=${answer.answerPicturePath}&sz=w2000`}
            
                />
              
               </>
            )}
          </WidgetWrapper>
        ))}
      {answers.length > 1 && (
        <>
          {!showAllAnswers ? (
            <Button onClick={handleShowAllAnswers}>Show more answers</Button>
          ) : (
            <Button onClick={handleShowLessAnswers}>Show less answers</Button>
          )}
        </>
      )}
      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          <Box mt="0.5rem" mb="0.5rem">
            <TextField
              id="comment-input"
              label="Write a comment"
              multiline
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleCommentSubmit}
                      disabled={!commentInput.trim() || isSubmittingComment}
                    >
                      <SendOutlined sx={{ color: primary }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Divider />
          </Box>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`} height="auto" maxwidth="650px">
              <Divider />
              <Box
                display="flex"
                alignItems="center"
                sx={{ pl: "1rem", mt: "0.3rem", mb: "0.5rem" }}
              >
                <UserImage
                  image={comment.userPicturePath}
                  size="30px"
                  sx={{ mr: "1rem" }}
                />
                <Box>
                  <Typography variant="body2" sx={{ color: main, m: "0.5rem" }}>
                    {comment.name}
                  </Typography>
                </Box>
              </Box>

              <br />
              <Box
                direction="row"
                overflow="hidden"
                marginLeft="60px"
                marginRight="60px"
                mt="0rem"
                mb="0.5rem"
              >
                <Typography
                  variant="body2"
                  sx={{ color: main, whiteSpace: "pre-wrap" }}
                >
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidgets;

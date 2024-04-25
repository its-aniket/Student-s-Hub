import WidgetWrapper from 'components/WidgetWrapper';
import React, { useState } from 'react';

const AnswerWidget = ({ answers }) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleShowAllAnswers = () => {
    setShowAllAnswers(true);
  };
  const handleAns = async () => {
    const formData = new FormData();
    formData.append("ansCode", ansCode);
    formData.append("AnsDescription", answerDescription);
    formData.append("userPicturePath", loggedInUserPicturePath);
    if(ansImage){
      formData.append("picture", ansImage);
      formData.append("answerPicturePath", ansImage.name);
    }
    formData.append("name", loggedInUserName);
    try {
      const response = await fetch(
        `https://studentshubserver-eb5u4c2w3-itsaniket1s-projects.vercel.app/posts/${postId}/answer`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`},
          body: formData,
        }
      );
      console.log(response);
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setAnsCode("");
      setAnswer("");
      setAnsImage(null);
    } catch (error) {
      console.error("Error submitting ans:", error);
    }
  };

  return (
    <WidgetWrapper>

    {answers.slice(0, showAllAnswers ? answers.length : 1).map((answer, i) => (
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
        {isAnsImage && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`https://studentshubserver-eb5u4c2w3-itsaniket1s-projects.vercel.app/assets/${answer.answerPicturePath}`}
          />
        )}
      </WidgetWrapper>
    ))}
     </WidgetWrapper>
  );
};

export default AnswerWidget;
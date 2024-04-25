import React from "react";
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/userwidget";
import { useSelector } from "react-redux";
import MyPostWidgets from "scenes/widgets/MyPostWidgets";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
const Homepage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
 

  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidgets picturePath={picturePath} />
          <Box m="0.5rem 0" />
          <PostsWidget userId={_id} isProfile={false} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            
            <AdvertWidget/>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>

  );
};

export default Homepage;

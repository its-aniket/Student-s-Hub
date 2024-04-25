import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId , isProfile=false}) => {
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null); // To store interval ID
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`https://studentshubserver-5dr0vg6s2-itsaniket1s-projects.vercel.app/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://studentshubserver-5dr0vg6s2-itsaniket1s-projects.vercel.app/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  };

  useEffect(() => {
    // Fetch posts initially
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

    const id = setInterval(() => {
    // Start polling for new posts every 10 seconds (adjust as needed)
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, 50000000); // Polling interval in milliseconds

    // Store interval ID
    setIntervalId(id);

    // Clean up the interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const posts = useSelector((state) => state.posts);

  // Add null and array checks for the posts array
  if (!Array.isArray(posts) || posts.length === 0) {
    return null; // Or any loading indicator you prefer
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          code,
          University,
          picturePath,
          userPicturePath,
          answers,
          likes,
          comments,
          
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            code={code}
            University={University}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            answers={answers}
            likes={likes}
            comments={comments}
            isProfile
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

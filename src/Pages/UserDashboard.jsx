import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { getCurrentUser } from "../Authentication";
import AddPost from "../Components/AddPost";
import Base from "../Components/Base";
import Posts from "../Components/Posts";

import {
  loadPostUserWise,
  deletePostService,
} from "../Service/Post-Service";
const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(getCurrentUser());
    setUser(getCurrentUser());
    loadPostData();
  }, []);

  function loadPostData() {
    loadPostUserWise(getCurrentUser().id)
      .then((data) => {
        console.log(data);
        setPosts([...data].reverse());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading user posts");
      });
  }

  //function to delete post
  function deletePost(post) {
    //going to delete post
    console.log(post);

    deletePostService(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("post is deleted..");
        loadPostData();
        // let newPosts = posts.filter((p) => p.postId != post.postId);
        // setPosts([...newPosts]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting post");
      });
  }

  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className="my-3">Posts Count : ({posts.length})</h1>

        {posts.map((post, index) => {
          return <Posts post={post} key={index} deletePost={deletePost} />;
        })}
      </Container>
    </Base>
  );
};

export default UserDashboard;

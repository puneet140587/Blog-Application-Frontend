import { privateAxios } from "./Helper";
import { myAxios } from "./Helper";

// Create Post
export const createPost = (postData) => {
  console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

// Fetch all Posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/allposts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

// Fetch single post by id
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

// Create Comment
export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment);
};

// upload post  banner image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// get Category wise posts
export function loadPostCategoryWise(categoryId) {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then((response) => response.data);
}

// get Category wise posts
export function loadPostUserWise(userId) {
  return privateAxios
    .get(`/user/${userId}/posts`)
    .then((response) => response.data);
}

//delete post
export function deletePostService(postId) {
  return privateAxios
    .delete(`/post/${postId}`)
    .then((response) => response.data);
}

//update post
export function updatePost(post, postId) {
  console.log(post);
  return privateAxios.put(`/post/${postId}`, post).then((resp) => resp.data);
}

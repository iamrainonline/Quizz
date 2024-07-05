import axios from "axios";

export const addPost = async (data) => {
   if (data.title.length === 0) {
      console.log("Comment cannot be empty");
      return "comment cannot be empty";
   }
   try {
      const response = await axios.post("/posts/createPost", data, {
         withCredentials: true,
      });
      console.log(response);
   } catch (e) {
      console.log("Error adding a post", e);
   }
};

// GET POSTS
export const getPosts = async () => {
   try {
      const response = await axios.get("/posts/getPosts", {
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error getting a post", e);
   }
};

// DELETE POST
export const deletePost = async (postId) => {
   const data = { postId: postId };
   try {
      const response = await axios.delete("/posts/deletePost/", {
         data: data,
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error deleting a post", e);
   }
};

// EDIT POST
export const editPost = async (post, postId, userId) => {
   const data = { post: post, postId: postId, userId: userId };
   try {
      const response = await axios.put("/posts/updatePost/", {
         data: data,
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error updating a post", e);
   }
};

import axios from "axios";
// create users

export const createUser = async (data) => {
   if (data.name.length === 0) {
      console.log("name cannot be empty");
      return "name cannot be empty";
   }
   try {
      const response = await axios.post("/users/createUser", data, {
         withCredentials: true,
      });
      console.log(response);
   } catch (e) {
      console.log("Error creating a username", e);
   }
};

// get users
export const getUsers = async () => {
   try {
      const response = await axios.get("/users/getUsers/", {
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error getting users", e);
   }
};

// DELETE USER
export const deleteUser = async (userId) => {
   const data = { userId: userId };
   try {
      const response = await axios.delete("/users/deleteUser/", {
         data: data,
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error deleting a user", e);
   }
};

// get user highscore
export const getUserHighscore = async () => {
   try {
      const response = await axios.get("/users/getUsersHighscore/", {
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error getting user highscore", e);
   }
};

// get user highscore
export const setUserHighscore = async (userId, score) => {
   const data = { userId: userId, score: score };
   try {
      const response = await axios.post("/users/setUserHighscore/", {
         data: data,
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error setting user highscore", e);
   }
};

// get questions
import axios from "axios";

export const getQuestions = async () => {
   try {
      const response = await axios.get("/questions/getQuestions/", {
         withCredentials: true,
      });
      return response.data;
   } catch (e) {
      console.log("Error getting questions", e);
   }
};

import React, { useState } from "react";
import { editPost } from "../API/posts";

const EditModal = ({ data, setToggleModal, setRefreshPage, refreshPage }) => {
   const [inputValue, setInputValue] = useState(data[0]);
   const handleInputChange = (e) => {
      setInputValue(e.target.value);
   };

   return (
      <div className="modal">
         <h1>Edit</h1>
         <div className="modalwrapper">
            <input
               style={{ padding: "7px" }}
               type="text"
               value={inputValue}
               onChange={handleInputChange}
            />
            <button
               onClick={() => {
                  editPost(inputValue, data[1], data[2]);
                  setToggleModal(false);
                  setRefreshPage(!refreshPage);
               }}
            >
               Save
            </button>
            <button onClick={() => setToggleModal(false)}>Cancel</button>
         </div>
      </div>
   );
};

export default EditModal;

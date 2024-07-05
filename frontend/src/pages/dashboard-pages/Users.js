import React, { useState, useEffect } from "react";
import { deleteUser, createUser, getUsers } from "../../API/users";
import moment from "moment";
import "../../SCSS/Users.scss";

const Users = () => {
   const initialNewUserState = {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
   };

   const [users, setUsers] = useState([]);
   const [newUser, setNewUser] = useState(initialNewUserState);
   const [showAdminUsers, setShowAdminUsers] = useState(false);

   useEffect(() => {
      const fetchUsers = async () => {
         const fetchedUsers = await getUsers();
         setUsers(fetchedUsers);
      };
      fetchUsers();
   }, []);

   const formatDate = (dateString) => {
      return moment(dateString).format("MMMM DD, YYYY HH:mm");
   };

   const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;
      setNewUser({ ...newUser, [name]: newValue });
   };

   const handleCreateUser = async () => {
      const response = await createUser(newUser);
      setNewUser(initialNewUserState);
      setUsers([...users, response]); // Update users state with the new user
   };

   const handleDeleteUser = async (userId) => {
      await deleteUser(userId);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
   };

   const filteredUsers = users.filter((user) => {
      if (showAdminUsers && !user.isAdmin) {
         return false;
      }
      return true;
   });

   return (
      <div className="users wrapper">
         <div className="create-user">
            <h2>Create New User</h2>
            <div className="inputs-new-user">
               <div className="input-group">
                  <div>
                     <p>Name</p>
                     <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div>
                     <p>Email</p>
                     <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div>
                     <p>Password</p>
                     <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                     />
                  </div>
               </div>

               <div>
                  <div>
                     <label htmlFor="isAdmin">
                        <button className="submit" onClick={handleCreateUser}>
                           Create
                        </button>
                        <input
                           type="checkbox"
                           id="isAdmin"
                           name="isAdmin"
                           checked={newUser.isAdmin}
                           onChange={handleInputChange}
                        />
                        Is Admin?
                     </label>
                  </div>
               </div>
            </div>
         </div>
         <div className="filter-section">
            <label>
               <input
                  type="checkbox"
                  checked={showAdminUsers}
                  onChange={() => setShowAdminUsers(!showAdminUsers)}
               />
               Show Admin Users
            </label>
         </div>
         <br />
         <div className="user-list">
            {filteredUsers.map((user) => (
               <div className="single-user" key={user.id}>
                  <div className="user-info">
                     <p>
                        <b style={{ color: user.isAdmin ? "red" : "inherit" }}>
                           {user.isAdmin ? "Admin" : "User"}
                        </b>
                     </p>
                     <p>
                        <b>Name:</b> {user.username}
                     </p>
                     <p>
                        <b>Email:</b> {user.email}
                     </p>
                     <p>
                        <b>Created At:</b> {formatDate(user.created_at)}
                     </p>
                  </div>
                  <div className="user-buttons">
                     <button>Edit</button>
                     {!user.isAdmin && (
                        <button
                           className="deleteBtn"
                           onClick={() => handleDeleteUser(user.id)}
                        >
                           Delete
                        </button>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Users;

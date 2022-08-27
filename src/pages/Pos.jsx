import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Main from "../Main";
import "./Pos.css";
const Pos = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Main />
      <button onClick={handleLogout} className="border px-6 py-2 my-4 logout">
        Logout
      </button>
    </>
  );
};

export default Pos;

// <div className="max-w-[600px] mx-auto my-16 p-4">
//   <h1 className="text-2xl font-bold py-4">Pos</h1>
//   <p>User Email: {user && user.email}</p>
// </div>

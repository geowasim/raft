import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import Main from "../Main";
import "./Pos.css";
const Pos = ({ readEcode }) => {
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
      {/* {user && (
        <button
          style={{
            position: "absolute",
            top: "0px",
            right: "50%",
            zIndex: "-1",
          }}
        >
          {auth.currentUser.email
            .slice(0, auth.currentUser.email.indexOf("@"))
            .toUpperCase()}{" "}
          - مرحباً بك
        </button>
      )} */}
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

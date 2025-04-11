// Components/NavBar/Backbutton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      style={{
        position: "fixed",
        left: "265px",
        top: "65px",
        padding: "8px 12px",
        borderRadius: "6px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 2000,
      }}
      onClick={() => navigate(-1)}
    >
      ⬅ Back
    </button>
  );
};

export default BackButton;

import React from "react";
import { useAuth } from "../Components/AuthContext";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!currentUser) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontSize: "18px" }}>
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>User Profile</h2>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p style={{ margin: "10px 0" }}>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>User ID:</strong> {currentUser.id}
        </p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;

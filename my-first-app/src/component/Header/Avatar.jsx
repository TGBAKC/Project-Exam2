import React, { useState } from "react";

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/users/me/avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      if (response.ok) {
        alert("Avatar updated successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update avatar.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Update Avatar</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatarUrl}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Avatar
        </button>
      </form>
    </div>
  );
};

export default Avatar;

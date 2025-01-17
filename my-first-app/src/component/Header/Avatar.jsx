import React from "react";

function Avatar({ avatarUrl }) {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="User Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <i
          className="fa fa-user"
          style={{
            fontSize: "20px",
            color: "#fff",
          }}
        ></i>
      )}
    </div>
  );
}

export default Avatar;

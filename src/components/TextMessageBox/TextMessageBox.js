import React from "react";

function TextMessageBox({ message, user }) {
  const color = (message.userId === user) ? "blue" : "grey";

  return (
    <div className={`textMessage ${color}`}>
      <p>{message.message}</p>
    </div>
  );
}

export default TextMessageBox;
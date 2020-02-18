import React from "react";

function TextMessageBox({ message, user }) {
  const color = ((user && message.userId === user.uid)) ? "green" : "grey";

  return (
    <div className={`textMessage ${color}`}>
      <span>{message.sentBy}</span>
      <span>{message.message}</span>
    </div>
  );
}

export default TextMessageBox;
import React from "react";

const formatDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  
  return hours + ':' + minutes.substr(-2)
}

function TextMessageBox({ message, user }) {
  const color = ((user && message.userId === user.uid)) ? "green" : "grey";

  return (
    <div className={`textMessage ${color}`}>
      <span>{message.sentBy} - {formatDateFromTimestamp(message.createdAt.seconds)}</span>
      <span>{message.message}</span>
    </div>
  );
}

export default TextMessageBox;
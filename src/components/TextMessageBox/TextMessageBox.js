import React from "react";

function TextMessageBox({ message }) {

  return (
    <div>
      <p>{message.message}</p>
    </div>
  );
}

export default TextMessageBox;
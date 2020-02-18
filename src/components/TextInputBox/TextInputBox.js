import React, { useState } from "react";

function TextInputBox({ messagesApi, user }) {

  const [newMessage, setNewMessage] = useState('');

  const onCreate = (e) => {
    e.preventDefault();
    messagesApi.add({ message: newMessage, createdAt: new Date(), userId: user });
    setNewMessage('')
  };

  return (
    <div className={`textInput`}>
      <textarea
        value={newMessage}
        onChange={e => {
          setNewMessage(e.target.value)

          if (e.target.value.slice(-1) === "\n") {
            onCreate(e);
          }
        }}
      ></textarea>
      <button onClick={onCreate}>Send</button>
    </div>
  );
}

export default TextInputBox;
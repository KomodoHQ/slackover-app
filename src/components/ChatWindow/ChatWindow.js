import React from "react";
import TextMessageBox from '../TextMessageBox'

function ChatWindow({ messages, user }) {

  return (
    <div className={`chatWindow`}>
      {messages && messages.map((message) => {
        console.log(message);
        return <TextMessageBox message={message} key={message.id} user={user} />;
      })}
    </div>
  );
}

export default ChatWindow;
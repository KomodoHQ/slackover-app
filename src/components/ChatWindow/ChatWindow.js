import React from "react";
import TextMessageBox from '../TextMessageBox'

function ChatWindow({ messages }) {

  return (
    <div>
      {messages && messages.map((message) => {
        return <TextMessageBox message={message} key={message.id} />;
      })}
    </div>
  );
}

export default ChatWindow;
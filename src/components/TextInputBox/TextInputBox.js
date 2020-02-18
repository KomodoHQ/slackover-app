import React, { useState, useMemo } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

function TextInputBox({ messagesApi, user }) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [newMessage, setNewMessage] = useState([ { children: [ { text: '' } ] } ]);

  const onCreate = (e) => {
    e.preventDefault();
    const text = parseText(newMessage);

    // Add the message to the database
    messagesApi.add({ message: text, createdAt: new Date(), userId: user.uid });

    // ... then we can reset state
    setNewMessage([ { children: [ { text: '' } ] } ]);
  }

  const parseText = (nodes) => {
    return nodes.map(n => Node.string(n)).join('\n')
  }

  return (
    <div className={`textInput`}>
      <Slate editor={editor} value={newMessage} onChange={value => {
          setNewMessage(value);
        }}>
        <Editable placeholder="Enter some plain text..." />
      </Slate>
      <button onClick={onCreate}>Send</button>
    </div>
  );
}

export default TextInputBox;
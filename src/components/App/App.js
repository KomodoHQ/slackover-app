import React, { useState, useEffect } from 'react';
import API from "../../api";
import Store, {
  startRealtimeMessagesStreamWithChannel
} from "../../store/store";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ChatWindow from "../ChatWindow";
import TextInputBox from "../TextInputBox";
import ChannelList from "../ChannelList";
import './App.css';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [API.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

const App = () => {

  const [ signedIn, setSignedIn ] = useState(false); 
  const [ user, setUser ] = useState();
  const [ messages, setMessages ] = useState([]);
  const [ channel, setChannel ] = useState('general');

  useEffect(() => {
    API.auth().onAuthStateChanged(user => {
      setSignedIn(user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    startRealtimeMessagesStreamWithChannel(channel, (error, newMessages) => {
      if (error) {
        console.log(error)
      }
      setMessages(newMessages);
    });
  }, [channel]);

  return (
    <div className="App">
      {!signedIn && (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={API.auth()} />
      )}
      {signedIn && (
        <>
          <h1>Generic Chat!</h1>
          <p>
            <button
              onClick={e => {
                e.preventDefault();
                API.auth().signOut();
                setSignedIn(false);
              }}
            >
              Logout
            </button>
          </p>
          <div className={`channelList`}>
            <ChannelList />
          </div>
          <div className={`channel`}>
            <ChatWindow
              messages={messages}
              user={user}
            />
            <TextInputBox messagesApi={Store} user={user} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

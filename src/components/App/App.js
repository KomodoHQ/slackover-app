import React, { useState, useEffect } from 'react';
import API from "../../api";
import Store from '../../store/store'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ChatWindow from "../ChatWindow";
import TextInputBox from "../TextInputBox";
import ChannelList from "../ChannelList";
import './App.css';

const App = () => {
  const storeMessages = Store.getMessagesInChannel('general');

  const [ signedIn, setSignedIn ] = useState(false); 
  const [ user, setUser ] = useState();
  const [ messages, setMessages ] = useState(storeMessages);

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

  // This is passed down as props to the text input component so that the users can send 
  // messages directly to the firestore.
  const db = API.firestore();
  const messagesApi = db.collection("messages");

  const logInUser = (user) => {
    setSignedIn(user);
    setUser(user);
  }

  useEffect(() => {
    API.auth().onAuthStateChanged(user => logInUser(user));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await messagesApi.get();
  //     setMessages(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //   };
  //   fetchData();
  // }, [messagesApi]);

  return (
    <div className="App">
      {!signedIn && (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={API.auth()} />
      )}
      {signedIn && (
        <>
        <h1>Generic Chat!</h1>
          <p>
            <button onClick={(e) => {
              e.preventDefault();
              API.auth().signOut();
              setSignedIn(false);
            }}>Logout</button>
          </p>
          <div className={`channelList`}>
            <ChannelList />
          </div>
          <div className={`channel`}>
            <ChatWindow messages={messages} user={user} />
            <TextInputBox messagesApi={messagesApi} user={user} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import API from "../../api";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ChatWindow from "../ChatWindow";
import TextInputBox from "../TextInputBox";
import ChannelList from "../ChannelList";
import Store from '../../store/store'
import './App.css';

function App() {

  const storeMessages = Store.messagesInChannel('general');
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

import React, { useState, useEffect } from 'react';
import API from "../../api";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ChatWindow from "../ChatWindow";
import TextInputBox from "../TextInputBox";
import './App.css';

function App() {

  const [ signedIn, setSignedIn ] = useState(false); 
  const [ userId, setUserId ] = useState("");
  const [ messages, setMessages ] = useState([
    { message: "Hello", createdAt: new Date(), userId: "pMKR3dqINHZYCCs6I5UDZXziOqI3" },
    { message: "Morning!", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3" },
    { message: "What's the plan today?", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3" },
    { message: "Read emails...", createdAt: new Date(), userId: "pMKR3dqINHZYCCs6I5UDZXziOqI3" },
    { message: "Roger", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3" },
  ]);

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
    setUserId(user.uid);
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
      <header className="App-header">
        {!signedIn && (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={API.auth()} />
        )}
        {signedIn && (
          <>
            <p>
              Welcome! <button onClick={(e) => {
                e.preventDefault();
                API.auth().signOut();
                setSignedIn(false);
              }}>Logout</button>
            </p>
            <ChatWindow messages={messages} user={userId} />
            <TextInputBox messagesApi={messagesApi} user={userId} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

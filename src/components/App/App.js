import React, { useState, useEffect } from 'react';
import API from "../../api";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ChatWindow from "../ChatWindow";
import TextInputBox from "../TextInputBox";
import './App.css';

function App() {

  const [ signedIn, setSignedIn ] = useState(false); 
  const [ messages, setMessages ] = useState([]);

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

  useEffect(() => {
    // Update the document title using the browser API
    API.auth().onAuthStateChanged(user => setSignedIn(user));
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await messagesApi.get();
      setMessages(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [messagesApi]);

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
            <ChatWindow messages={messages} />
            <TextInputBox messagesApi={messagesApi} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

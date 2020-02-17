import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDGdtOYgnt5tHlSu4iWTH_w43q6aZp6W-M",
  authDomain: "slackover-f77c9.firebaseapp.com",
  databaseURL: "https://slackover-f77c9.firebaseio.com",
  projectId: "slackover-f77c9",
  storageBucket: "slackover-f77c9.appspot.com",
  messagingSenderId: "50629004745",
  appId: "1:50629004745:web:14bf9209b9995598a8ac18"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
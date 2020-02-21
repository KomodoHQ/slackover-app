import firebase from 'firebase'

const config = {
  apiKey: "<your key here>",
  authDomain: "<your key here>",
  databaseURL: "<your key here>",
  projectId: "<your key here>",
  storageBucket: "<your key here>",
  messagingSenderId: "<your key here>",
  appId: "<your key here>8"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
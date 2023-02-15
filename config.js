import firebase from 'firebase';

// adicione SDK do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA_pfm27IWTTrgxatUm1FdG9Uh3_Z6Qdi4",
    authDomain: "team-voting-app-52d76.firebaseapp.com",
    databaseURL: "https://team-voting-app-52d76-default-rtdb.firebaseio.com",
    projectId: "team-voting-app-52d76",
    storageBucket: "team-voting-app-52d76.appspot.com",
    messagingSenderId: "903332684247",
    appId: "1:903332684247:web:1b61dbbe3e06f658f86b92"
};
// Initialice o Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBugmllnM5uI4XHXRErKVVNScIL3GYu6xQ",
  authDomain: "weblog-b8554.firebaseapp.com",
  projectId: "weblog-b8554",
  storageBucket: "weblog-b8554.appspot.com",
  messagingSenderId: "216501674399",
  appId: "1:216501674399:web:123e6c2eacdf04889b5daa",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const fire = firebase;
export default fire;

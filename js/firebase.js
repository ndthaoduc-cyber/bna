// Central Firebase initialization (v8 namespaced SDK)
// This file centralizes the firebaseConfig and app initialization.
// It expects the namespaced SDK (firebase-app.js, firebase-auth.js, firebase-firestore.js)
// to be loaded in the page before this script.
const firebaseConfig = {
  apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
  authDomain: "lllllll-3452e.firebaseapp.com",
  projectId: "lllllll-3452e",
  storageBucket: "lllllll-3452e.firebasestorage.app",
  messagingSenderId: "550371574338",
  appId: "1:550371574338:web:e609197341f4696689e3db",
  measurementId: "G-FGB3ZB0DS4"
};

if (!window.firebase) {
  console.error('Firebase SDK not loaded. Ensure firebase-app.js is included before js/firebase.js');
} else {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
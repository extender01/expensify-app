import * as firebase from "firebase";


// Initialize Firebase
const config = {
    apiKey: "AIzaSyCrAHG2beVvbXwzrMQLbam3ui5ECRR4wRU",
    authDomain: "expensify-6cc80.firebaseapp.com",
    databaseURL: "https://expensify-6cc80.firebaseio.com",
    projectId: "expensify-6cc80",
    storageBucket: "expensify-6cc80.appspot.com",
    messagingSenderId: "255741140296"
  };
  
  firebase.initializeApp(config);

  firebase.database().ref().set({
      name: "Eso Rimmer"
  });
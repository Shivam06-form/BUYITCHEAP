
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


    const Config = {
        apiKey: "AIzaSyCHFEbrD2qXuEP2M1GK-l43bNtKK8aUln0",
        authDomain: "shopping-app-8989f.firebaseapp.com",
        databaseURL: "https://shopping-app-8989f-default-rtdb.firebaseio.com",
        projectId: "shopping-app-8989f",
        storageBucket: "shopping-app-8989f.appspot.com",
        messagingSenderId: "158620828663",
        appId: "1:158620828663:web:9ade96742ffa6a574524f2",
        measurementId: "G-6EXKJJTKXB"
    }

  const app = firebase.initializeApp(Config);
  export const auth = app.auth();
  export const database =app.database();
  export const storage = app.storage();
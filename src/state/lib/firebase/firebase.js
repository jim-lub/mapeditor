import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

export class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.googleProvider.addScope('email');
  }

  /*** Utils ***/
  timestamp = app.firestore.FieldValue.serverTimestamp();
  serverTimestamp = app.firestore.FieldValue.serverTimestamp();

  /*** Auth API ***/
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () =>
    this.auth.signOut();

  /*** User API ***/
  user = uid =>
    this.db.doc(`users/${uid}`);

  users = () =>
    this.db.collection('users');


  /*** Project & Scenes API ***/
  project = uid =>
    this.db.doc(`projects/${uid}`);
  projects = () =>
    this.db.collection('projects');

  scene = uid =>
    this.db.doc(`scenes/${uid}`);

  scenes = () =>
    this.db.collection('scenes');

  tilemapData = uid =>
    this.db.doc(`tilemapData/${uid}`);

  tileDataCollection = () =>
    this.db.collection('tilemapData');

}

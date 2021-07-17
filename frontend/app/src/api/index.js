// Contains all communication with Firestore database

import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase/firebaseConfig';

const getDb = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore();
};

class API {
  #db;

  constructor() {
    this.#db = getDb();
    this.glojects = {
      getAll: async () => await this.#db.collection('glojects').get(),
      getById: async (glojectId) =>
        await this.#db.collection('glojects').doc(glojectId).get(),
      exists: async (glojectId) =>
        (await this.glojects.getById(glojectId)).exists,
    };
    this.users = {
      createUser: async (uid, username, email, location) =>
        await this.#db.collection('users').document(uid).set({
          username: username,
          email: email,
          location: location,
          active_glojects: [],
          past_glojects: [],
          interests: [],
        }),
      getByUsername: async (uid) =>
        await this.#db.collection('users').doc(uid).get(),
      exists: async (uid) => (await this.users.getByUsername(uid)).exists,
    };
  }
}

export default new API();

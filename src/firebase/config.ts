import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8EXimNBqPQ4Uynf_Zjes8btkYXGiR1lg',
  authDomain: 'webtestik-e22cf.firebaseapp.com',
  projectId: 'webtestik-e22cf',
  storageBucket: 'webtestik-e22cf.appspot.com',
  messagingSenderId: '875038648751',
  appId: '1:875038648751:web:9c945c8b6466c24da6e75a',
  measurementId: 'G-PGZNZFZY8C',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const auth = getAuth();

export { projectFirestore, auth };

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDiB1ryXz1k0S7LeNdB6jmsQN3IXupQI5Y",
  authDomain: "blog-starter-app-42e9e.firebaseapp.com",
  projectId: "blog-starter-app-42e9e",
  storageBucket: "blog-starter-app-42e9e.appspot.com",
  messagingSenderId: "348534588718",
  appId: "1:348534588718:web:323e973c6af3682f5e26bf",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc, orderBy, limit } from "firebase/firestore"

export async function createArticle({ title, body, author }) {
  const data = { title, body, date: new Date(), author }
  const docRef = await addDoc(collection(db, "articles"), data)
  return { id: docRef.id, ...data }
}

export async function fetchArticles() {
  const querySnapshot = await getDocs(
    collection(db, "articles"),
    orderBy("date", "desc"),
    limit(50)
  )
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

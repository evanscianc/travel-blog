import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { fetchArticles, createArticle } from "./articleService"
import "./App.css"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebaseConfig"
import { bubble as Menu } from "react-burger-menu"

function SignIn() {
  return (
    <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
      Sign In
    </button>
  )
}

function SignOut() {
  return (
    <div className="SignOut">
      Hello, {auth.currentUser.displayName}
      <button className="signOutBtn" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  )
}

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(null)
  const [user] = useAuthState(auth)

  // This is a trivial app, so just fetch all the articles once, when
  // the app is loaded. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    fetchArticles().then(setArticles)
  }, [])

  useEffect(() => {}, [article])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    let author = auth.currentUser.displayName
    createArticle({ title, body, author }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  return (
    <div className="App">
      <header>
        {user && (
          <button className="newArticle" onClick={() => setWriting(true)}>
            New Article
          </button>
        )}
        <div className="pageTitle"> Awesome Travel Blog </div>
        {!user ? <SignIn /> : <SignOut />}
      </header>

      <Menu right>
        {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}
      </Menu>

      {!user ? (
        <div></div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
      <footer> </footer>
    </div>
  )
}

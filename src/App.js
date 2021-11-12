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
    <button
      className="signInBtn"
      onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
    >
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

  useEffect(() => {
    fetchArticles().then(setArticles)
  }, [])

  useEffect(() => {}, [article])

  async function addArticle({ title, body }) {
    let author = auth.currentUser.displayName
    return createArticle({ title, body, author }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  return (
    <div className="App">
      <header>
        {user ? (
          <button className="newArticle" onClick={() => setWriting(true)}>
            New Article
          </button>
        ) : (
          <div className="signInMsg">Please sign in to view articles. </div>
        )}
        <div className="pageTitle"> 🌴Awesome Travel Blog🌴 </div>
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {user && (
        <div
          className="SideBar"
          onClick={() => {
            setWriting(false)
          }}
        >
          <Menu right>
            {user && <Nav articles={articles} setArticle={setArticle} />}
          </Menu>
        </div>
      )}

      {!user ? (
        <div className="signInMsgBig">Please sign in to view articles🌴 </div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
      <footer> </footer>
    </div>
  )
}

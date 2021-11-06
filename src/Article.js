export default function Article({ article }) {
  return (
    <article>
      {!article ? (
        <p className="welcomeMsg">
          Welcome to the Travel Blog! Feel free to browse the articles on the
          right.
        </p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p> by {article.author} </p>
          {/* currently causing bug related to when you create a new article */}
          <p className="date">{`Posted: ${article.date
            .toDate()
            .toLocaleDateString()}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  )
}

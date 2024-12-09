import "./DetalhesLivro.css";

export function DetalhesLivro({ book }) {
  return (
    <div className="detalhes-livro-container">
      <h2>Detalhes do Livro</h2>
      {book.title && (
        <div>
          <strong>Título:</strong> <span>{book.title}</span>
        </div>
      )}
      {book.subtitle && (
        <div>
          <strong>Subtítulo:</strong> <span>{book.subtitle}</span>
        </div>
      )}
      {book.authors && book.authors.length > 0 && (
        <div>
          <strong>Autores:</strong> <span>{book.authors.join(", ")}</span>
        </div>
      )}
      {book.description && (
        <div>
          <strong>Descrição:</strong> <span>{book.description}</span>
        </div>
      )}
      {book.publisher && (
        <div>
          <strong>Editora:</strong> <span>{book.publisher}</span>
        </div>
      )}
      {book.publishedDate && (
        <div>
          <strong>Data de Publicação:</strong> <span>{book.publishedDate}</span>
        </div>
      )}
      {book.language && (
        <div>
          <strong>Idioma:</strong> <span>{book.language}</span>
        </div>
      )}
      {book.pageCount && (
        <div>
          <strong>Páginas:</strong> <span>{book.pageCount}</span>
        </div>
      )}
      {book.averageRating && (
        <div>
          <strong>Avaliação Média:</strong> <span>{book.averageRating}</span>
        </div>
      )}
      {book.ratingsCount && (
        <div>
          <strong>Contagem de Avaliações:</strong>{" "}
          <span>{book.ratingsCount}</span>
        </div>
      )}
    </div>
  );
}

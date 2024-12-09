import { useState } from "react";
import "./EditarLivro.css";

export function EditarLivro({ book, onSave }) {
  const [title, setTitle] = useState(book.title || "");
  const [authors, setAuthors] = useState((book.authors || []).join(", "));
  const [imageUrl, setImageUrl] = useState(book.imageLinks?.thumbnail || "");
  const [categories, setCategories] = useState(
    (book.categories || []).join(", ")
  );

  const handleSave = () => {
    const updatedBook = {
      ...book,
      title,
      authors: authors.split(",").map((author) => author.trim()),
      imageLinks: { ...book.imageLinks, thumbnail: imageUrl },
      categories: categories.split(",").map((category) => category.trim()),
    };
    onSave(updatedBook);
  };

  return (
    <div className="editar-livro-container">
      <h2>Editar Livro</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Autores:</label>
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
        />
      </div>
      <div>
        <label>URL da Imagem:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Gênero:</label>
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}

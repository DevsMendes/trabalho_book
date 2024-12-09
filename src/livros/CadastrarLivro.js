import { useState } from "react";
import "./CadastrarLivro.css";

export function CadastrarLivro({ onSave }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState("");

  const handleSave = () => {
    const newBook = {
      title,
      authors: authors.split(",").map((author) => author.trim()),
      imageLinks: { thumbnail: imageUrl },
      categories: categories.split(",").map((category) => category.trim()),
    };
    onSave(newBook);
  };

  return (
    <div className="cadastrar-livro-page">
      <div className="cadastrar-livro-container">
        <h2>Cadastrar Livro</h2>
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
    </div>
  );
}

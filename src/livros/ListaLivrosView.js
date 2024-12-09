import { findAllBooks, createBook, deleteBook } from "./LivrosApi";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { LivrosLidos } from "./LivrosLidos";
import { LivrosLendo } from "./LivrosLendo";
import { LivrosQueroLer } from "./LivrosQueroLer";
import { CadastrarLivro } from "./CadastrarLivro";
import { EditarLivro } from "./EditarLivro";
import { DetalhesLivro } from "./DetalhesLivro";

import "./ListaLivrosView.css";

export function ListaLivrosView() {
  const [livros, setLivros] = useState([]);
  const [view, setView] = useState("todos");
  const [livrosLidos, setLivrosLidos] = useState(
    JSON.parse(localStorage.getItem("livrosLidos")) || []
  );
  const [livrosLendo, setLivrosLendo] = useState(
    JSON.parse(localStorage.getItem("livrosLendo")) || []
  );
  const [livrosQueroLer, setLivrosQueroLer] = useState(
    JSON.parse(localStorage.getItem("livrosQueroLer")) || []
  );
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const livros = await findAllBooks();
      setLivros(livros);
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("livrosLidos", JSON.stringify(livrosLidos));
  }, [livrosLidos]);

  useEffect(() => {
    localStorage.setItem("livrosLendo", JSON.stringify(livrosLendo));
  }, [livrosLendo]);

  useEffect(() => {
    localStorage.setItem("livrosQueroLer", JSON.stringify(livrosQueroLer));
  }, [livrosQueroLer]);

  const atualizarLivros = async () => {
    const livros = await findAllBooks();
    setLivros(livros);
  };

  const updateBookStatus = (book, status) => {
    setLivrosLidos(livrosLidos.filter((l) => l.id !== book.id));
    setLivrosLendo(livrosLendo.filter((l) => l.id !== book.id));
    setLivrosQueroLer(livrosQueroLer.filter((l) => l.id !== book.id));

    switch (status) {
      case "lidos":
        if (!livrosLidos.some((l) => l.id === book.id)) {
          setLivrosLidos([...livrosLidos, book]);
        }
        break;
      case "lendo":
        if (!livrosLendo.some((l) => l.id === book.id)) {
          setLivrosLendo([...livrosLendo, book]);
        }
        break;
      case "quero-ler":
        if (!livrosQueroLer.some((l) => l.id === book.id)) {
          setLivrosQueroLer([...livrosQueroLer, book]);
        }
        break;
      default:
        break;
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setView("editar");
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setView("detalhes");
  };

  const handleSave = async (updatedBook) => {
    setLivrosLidos(
      livrosLidos.map((l) => (l.id === updatedBook.id ? updatedBook : l))
    );
    setLivrosLendo(
      livrosLendo.map((l) => (l.id === updatedBook.id ? updatedBook : l))
    );
    setLivrosQueroLer(
      livrosQueroLer.map((l) => (l.id === updatedBook.id ? updatedBook : l))
    );
    setLivros(livros.map((l) => (l.id === updatedBook.id ? updatedBook : l)));
    setView("todos");
  };

  const handleCreate = async (newBook) => {
    const createdBook = await createBook(newBook);
    setLivros([...livros, createdBook]);
    setView("todos");
  };

  const renderView = () => {
    switch (view) {
      case "lidos":
        return (
          <LivrosLidos livros={livrosLidos} onUpdateStatus={updateBookStatus} />
        );
      case "lendo":
        return (
          <LivrosLendo livros={livrosLendo} onUpdateStatus={updateBookStatus} />
        );
      case "quero-ler":
        return (
          <LivrosQueroLer
            livros={livrosQueroLer}
            onUpdateStatus={updateBookStatus}
          />
        );
      case "cadastrar":
        return <CadastrarLivro onSave={handleCreate} />;
      case "editar":
        return <EditarLivro book={selectedBook} onSave={handleSave} />;
      case "detalhes":
        return <DetalhesLivro book={selectedBook} />;
      default:
        return (
          <div className="bookshelf">
            {livros.length > 0 ? (
              livros.map((l) => (
                <div key={l.id}>
                  <Card
                    book={l}
                    onUpdateStatus={updateBookStatus}
                    onEdit={handleEdit}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))
            ) : (
              <p>Nenhum livro encontrado</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        {/* Adicionando o ícone do livro na sidebar */}
        <i className="bi bi-book icon"></i>
        <div className="top-buttons">
          <button onClick={() => setView("todos")}>Todos os Livros</button>
          <button onClick={() => setView("lidos")}>Lido</button>
          <button onClick={() => setView("lendo")}>Em Leitura</button>
          <button onClick={() => setView("quero-ler")}>Desejo Ler</button>
        </div>
        <div className="bottom-button">
          <button onClick={() => setView("cadastrar")}>Cadastrar Livro</button>
        </div>
      </div>
      <div className="main-content">{renderView()}</div>
    </div>
  );
}

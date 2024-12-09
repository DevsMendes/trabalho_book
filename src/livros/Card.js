import "./Card.css";
import { useState } from "react";

export function Card({ book, onUpdateStatus, onEdit, onViewDetails }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ backgroundImage: `url(${book.imageLinks?.thumbnail})` }}
        ></div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-buttons">
        <div
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="dropbtn">
            <i className="fas fa-list"></i> Ações
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <button onClick={() => onUpdateStatus(book, "lendo")}>
                <i className="fas fa-book-open"></i> Em Leitura
              </button>
              <button onClick={() => onUpdateStatus(book, "quero-ler")}>
                <i className="fas fa-heart"></i> Desejo Ler
              </button>
              <button onClick={() => onUpdateStatus(book, "lidos")}>
                <i className="fas fa-check"></i> Lido
              </button>
            </div>
          )}
        </div>
        <button onClick={() => onEdit(book)}>
          <i className="fas fa-pen"></i> Editar
        </button>
        <button onClick={() => onViewDetails(book)}>
          <i className="fas fa-info"></i> Detalhes
        </button>
      </div>
    </div>
  );
}

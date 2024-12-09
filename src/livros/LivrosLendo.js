import { Card } from "./Card";

export function LivrosLendo({ livros, onUpdateStatus, onViewDetails }) {
  return (
    <div>
      <h2>Livros que Estou Lendo</h2>
      <div className="bookshelf">
        {livros && livros.length > 0 ? (
          livros.map((l) => (
            <div key={l.id}>
              <Card
                book={l}
                onUpdateStatus={onUpdateStatus}
                onViewDetails={onViewDetails}
              />
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado</p>
        )}
      </div>
    </div>
  );
}

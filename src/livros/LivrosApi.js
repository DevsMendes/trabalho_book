const URL =
  "https://api-books-dot-api-samples-423102.uc.r.appspot.com/api/books";

export async function findAllBooks() {
  const requestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer 12117682",
    },
  };

  const responseHttp = await fetch(URL, requestInit);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log(await responseHttp.text());
    throw new Error("Falha ao consultar os livros");
  }
}

export async function searchBooks(query) {
  const requestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer 12117682",
    },
  };

  const responseHttp = await fetch(URL, requestInit);

  if (responseHttp.ok) {
    const allBooks = await responseHttp.json();

    return allBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    console.log(await responseHttp.text());
    throw new Error("Falha ao pesquisar os livros");
  }
}

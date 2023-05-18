const library = [];

function Book(title, author, pages, readstatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readstatus = readstatus;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readstatusInput = document.getElementById("readstatus");

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const readstatus = readstatusInput.checked;

  const newBook = new Book(title, author, pages, readstatus);

  library.push(newBook);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readstatusInput.checked = false;
}
const submitButton = document.querySelector(".add-button");
submitButton.addEventListener("click", addBookToLibrary);
console.log(library);

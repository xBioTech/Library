const library = [];

function Book(title, author, pages, readstatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readstatus = readstatus;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readstatus = document.getElementById("readstatus").checked;

  const newBook = new Book(title, author, pages, readstatus);

  library.push(newBook);
}
const submitButton = document.querySelector(".add-button");
submitButton.addEventListener("click", addBookToLibrary);
console.log(library);

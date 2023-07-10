const library = [];

class Book {
  constructor(title, author, pages, readstatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstatus = readstatus;
  }

  checkboxStatus(readstatusButton) {
    if (this.readstatus) {
      readstatusButton.classList.add("readstatus-button");
      readstatusButton.textContent = "read";
    } else {
      readstatusButton.classList.remove("readstatus-button");
      readstatusButton.classList.add("readstatus-button-false");
      readstatusButton.textContent = "not read";
    }
  }

  toggleReadStatus(readstatusButton) {
    if (readstatusButton.textContent === "read") {
      readstatusButton.classList.remove("readstatus-button");
      readstatusButton.classList.add("readstatus-button-false");
      readstatusButton.textContent = "not read";
      this.readstatus = false;
    } else {
      readstatusButton.classList.remove("readstatus-button-false");
      readstatusButton.classList.add("readstatus-button");
      readstatusButton.textContent = "read";
      this.readstatus = true;
    }
    showBooksRead();
    showBooksUnread();
    showPagesRead();
  }
}

function addExampleBooks() {
  const example1 = new Book(
    "Harry Potter and the Sorcerer's Stone",
    "J. K. Rowling",
    336,
    true
  );
  const example2 = new Book(
    "The Lord of the Rings",
    "J. R. R. Tolkien",
    448,
    false
  );
  const example3 = new Book(
    "Game of Thrones Winter is Coming",
    "George R. R. Martin's",
    320,
    true
  );
  library.push(example1);
  library.push(example2);
  library.push(example3);
  addBookToTable(example1, library.length - 1);
  addBookToTable(example2, library.length - 2);
  addBookToTable(example3, library.length - 3);
  showTotalBooks();
  showBooksRead();
  showBooksUnread();
  showPagesRead();
  checkForExamples();
}

function checkForExamples() {
  if (library.length !== 0) {
    predefinedExamples.style.display = "none";
  } else {
    predefinedExamples.style.display = "inline";
  }
}

const predefinedExamples = document.querySelector(".example");
predefinedExamples.addEventListener("click", (e) => {
  e.preventDefault();
  addExampleBooks();
});

function showTotalBooks() {
  const totalBooks = document.querySelector(".total-books");
  totalBooks.textContent = `${library.length}`;
}

function showBooksRead() {
  const booksRead = document.querySelector(".total-books-read");
  const booksReadCount = library.filter((book) => book.readstatus).length;
  booksRead.textContent = booksReadCount.toString();
}

function showBooksUnread() {
  const booksUnread = document.querySelector(".total-books-unread");
  const booksUnreadCount = library.filter((book) => !book.readstatus).length;
  booksUnread.textContent = booksUnreadCount.toString();
}

function showPagesRead() {
  const bookPages = document.querySelector(".total-pages-read");
  const bookPagesCount = library.reduce((accumulator, book) => {
    if (book.readstatus) {
      return accumulator + parseInt(book.pages);
    }
    return accumulator;
  }, 0);
  bookPages.textContent = bookPagesCount;
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
  showTotalBooks();
  showBooksRead();
  showBooksUnread();
  showPagesRead();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readstatusInput.checked = false;

  checkForExamples();
  updateTable();
}

function addBookToTable(object, index) {
  const table = document.getElementsByTagName("table")[0];
  const tableBody = document.getElementsByTagName("tbody")[0];

  const tableRow = document.createElement("tr");
  tableRow.setAttribute("data-index", index);
  tableRow.classList.add("animated-table-rows");

  const titleCell = document.createElement("td");
  titleCell.textContent = object.title;
  tableRow.appendChild(titleCell);

  const authorCell = document.createElement("td");
  authorCell.textContent = object.author;
  tableRow.appendChild(authorCell);

  const pagesCell = document.createElement("td");
  pagesCell.textContent = object.pages;
  tableRow.appendChild(pagesCell);

  const readstatusCell = document.createElement("td");
  const readstatusButton = document.createElement("button");
  tableRow.appendChild(readstatusCell);
  readstatusCell.appendChild(readstatusButton);
  object.checkboxStatus(readstatusButton);
  readstatusButton.addEventListener("click", () => {
    object.toggleReadStatus(readstatusButton);
  });

  const remove = document.createElement("td");
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-button");
  removeBtn.textContent = "Delete";
  tableRow.appendChild(remove);
  remove.appendChild(removeBtn);
  removeBtn.addEventListener("click", () => {
    const index = parseInt(tableRow.getAttribute("data-index"));
    removeBookFromLibrary(index);
  });

  tableBody.appendChild(tableRow);
  table.appendChild(tableBody);
}

function removeBookFromLibrary(index) {
  const tableRow = document.querySelector(`tr[data-index="${index}"]`);
  tableRow.remove();
  library.splice(index, 1);
  updateTableIndices();
  showTotalBooks();
  showBooksRead();
  showBooksUnread();
  showPagesRead();
  checkForExamples();
}

function updateTable() {
  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const object = library[i];
    addBookToTable(object, i);
  }
}

function updateTableIndices() {
  const tableRows = document.querySelectorAll("tr[data-index]");
  tableRows.forEach((row, index) => {
    row.setAttribute("data-index", index);
  });
}
const submitButton = document.querySelector(".add-button");
submitButton.addEventListener("click", addBookToLibrary);
console.log(library);

const form = document.getElementsByTagName("form")[0];

const displayFormOnMobile = document.querySelector(".add-button-mobile");
displayFormOnMobile.addEventListener("click", () => {
  form.classList.remove("hideform");
  form.style.display = "block";
  form.classList.add("showform");
});

const closeFormOnMobileButton = document.querySelector(".close-button-mobile");
closeFormOnMobileButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.addEventListener("animationend", () => {
    if (form.classList.contains("hideform")) {
      form.style.display = "none";
    }
  });
  form.classList.remove("showform");
  form.classList.add("hideform");
});

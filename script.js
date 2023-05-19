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

  updateTable();
}

function addBookToTable(object, index) {
  const table = document.getElementsByTagName("table")[0];
  const tableBody = document.getElementsByTagName("tbody")[0];

  const tableRow = document.createElement("tr");
  tableRow.setAttribute("data-index", index);

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
  readstatusCell.textContent = object.readstatus;
  tableRow.appendChild(readstatusCell);

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

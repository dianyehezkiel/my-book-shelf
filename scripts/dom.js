const UNCOMPLETED_BOOKS_ID = "notCompletedBooks";
const COMPLETED_BOOKS_ID = "completedBooks";
const BOOK_ITEM_ID = "itemId";

function makeBooks(title, authors, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("bookDescTitle");
  bookTitle.innerText = title;

  const bookAuthors = document.createElement("p");
  bookAuthors.classList.add("bookDescauthors");
  bookAuthors.innerText = authors;

  const bookYear = document.createElement("p");
  bookYear.classList.add("bookDescYear");
  bookYear.innerText = year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("bookDesc")
  textContainer.append(bookTitle, bookAuthors, bookYear);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("bookButtons");

  if (isCompleted) {
    buttonsContainer.append(
      createEditButton(),
      createUndoButton(),
      createTrashButton()
    );
  } else {
    buttonsContainer.append(
      createEditButton(),
      createCompleteButton(),
      createTrashButton()
    );
  }

  const container = document.createElement("div");
  container.classList.add("bookListItem")
  container.append(textContainer, buttonsContainer);

  return container;
}

function createEditButton() {
  return createButton("editButton", "Edit", function (event) {
    editBook(event.target.parentElement.parentElement);
  })
}

function createUndoButton() {
  return createButton("undoButton", "Belum Tamat", function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("trashButton", "Hapus", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function createCompleteButton() {
  return createButton("completeButton", "Tamat", function (event) {
    moveBookToCompleted(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, buttonValue, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerHTML =  buttonValue;
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function addBook() {
  const bookTitle = document.getElementById("title").value;
  const bookAuthors = document.getElementById("authors").value;
  const bookYear = parseInt(document.getElementById("year").value);
  const isCompleted = document.getElementById("radioCompleted").checked;

  const book = makeBooks(bookTitle, bookAuthors, bookYear, isCompleted);
  const bookObject = composeBookObject(bookTitle, bookAuthors, bookYear, isCompleted);

  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  if (isCompleted) {
    document.getElementById(COMPLETED_BOOKS_ID).prepend(book);
  } else {
    document.getElementById(UNCOMPLETED_BOOKS_ID).prepend(book);
  }

  updateDataToStorage();
}

function editBook(bookItemElem) {
  const submitBookButton = document.getElementById("submitBook");
  const editBookButton = document.getElementById("editBook");
  const bookTitle = document.getElementById("title");
  const bookAuthors = document.getElementById("authors");
  const bookYear = document.getElementById("year");

  bookTitle.value = bookItemElem.querySelector(".bookDesc > .bookDescTitle").innerText;
  bookAuthors.value = bookItemElem.querySelector(".bookDesc > .bookDescauthors").innerText;
  bookYear.value = parseInt(bookItemElem.querySelector(".bookDesc > .bookDescYear").innerText);
  if (bookItemElem.parentElement.id === "notCompletedBooks") {
    document.getElementById("radioNotCompleted").checked = true;
  } else {
    document.getElementById("radioCompleted").checked = true;
  }

  submitBookButton.classList.add("hide");
  editBookButton.classList.remove("hide");

  bookModal.classList.remove("hide");
  bookModal.classList.remove("hideModal");
  bookModal.classList.add("showModal");


  editBookButton.onclick = function () {
    const newBookTitle = document.getElementById("title").value;
    const newBookAuthors = document.getElementById("authors").value;
    const newBookYear = parseInt(document.getElementById("year").value);
    const newCompleted = document.getElementById("radioCompleted").checked;

    const newBook = makeBooks(newBookTitle, newBookAuthors, newBookYear, newCompleted);

    const book = findBook(bookItemElem[BOOK_ITEM_ID]);
    newBook[BOOK_ITEM_ID] = book.id;
    book.title = newBookTitle;
    book.authors = newBookAuthors;
    book.year = newBookYear;
    book.isCompleted = newCompleted;

    bookItemElem.remove();

    if (newCompleted) {
      document.getElementById(COMPLETED_BOOKS_ID).prepend(newBook);
    } else {
      document.getElementById(UNCOMPLETED_BOOKS_ID).prepend(newBook);
    }


    updateDataToStorage();
  }
}

function moveBookToCompleted(bookItemElem) {
  const listCompleted = document.getElementById(COMPLETED_BOOKS_ID);
  const bookTitle = bookItemElem.querySelector(".bookDesc > .bookDescTitle").innerText;
  const bookAuthors = bookItemElem.querySelector(".bookDesc > .bookDescauthors").innerText;
  const bookYear = parseInt(bookItemElem.querySelector(".bookDesc > .bookDescYear").innerText);

  const newBook = makeBooks(bookTitle, bookAuthors, bookYear, true);

  const book = findBook(bookItemElem[BOOK_ITEM_ID]);
  book.isCompleted = true;
  newBook[BOOK_ITEM_ID] = book.id;

  listCompleted.prepend(newBook);
  bookItemElem.remove();

  updateDataToStorage();
}

function removeBook(bookItemElem) {

  const bookPosition = findBookIndex(bookItemElem[BOOK_ITEM_ID]);
  books.splice(bookPosition, 1);

  bookItemElem.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(bookItemElem) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOKS_ID);
  const bookTitle = bookItemElem.querySelector(".bookDesc > .bookDescTitle").innerText;
  const bookAuthors = bookItemElem.querySelector(".bookDesc > .bookDescauthors").innerText;
  const bookYear = parseInt(bookItemElem.querySelector(".bookDesc > .bookDescYear").innerText);

  const newBook = makeBooks(bookTitle, bookAuthors, bookYear, false);

  const book = findBook(bookItemElem[BOOK_ITEM_ID]);
  book.isCompleted = false;
  newBook[BOOK_ITEM_ID] = book.id;

  listUncompleted.prepend(newBook);
  bookItemElem.remove();

  updateDataToStorage();
}

addBookButton.onclick = function () {
  document.getElementById("title").value = "";
  document.getElementById("authors").value = "";
  document.getElementById("year").value = "";
  document.getElementById("radioNotCompleted").checked = true;
  document.getElementById("editBook").classList.add("hide");
  document.getElementById("submitBook").classList.remove("hide");

  bookModal.classList.remove("hide");
  bookModal.classList.remove("hideModal");
  bookModal.classList.add("showModal")
}

const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  bookModal.classList.remove("showModal");
  bookModal.classList.add("hideModal");
}

window.onclick = function (event) {
  if (event.target == bookModal) {
    bookModal.classList.remove("showModal");
    bookModal.classList.add("hideModal");
  }
}

function searchBookByTitle() {
  const searchQuery = document.getElementById("searchFormTitle").value;
  searchQuery.toLowerCase();
  const searchResult = findBookTitle(searchQuery);
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOKS_ID);
  const listCompleted = document.getElementById(COMPLETED_BOOKS_ID);

  if (searchResult.length > 0) {
    listUncompleted.innerHTML = "";
    listCompleted.innerHTML = "";
    for (book of searchResult) {
      const newBook = makeBooks(book.title, book.authors, book.year, book.isCompleted);
      newBook[BOOK_ITEM_ID] = book.id;
  
      if (book.isCompleted) {
        listCompleted.prepend(newBook);
      } else {
        listUncompleted.prepend(newBook);
      }
    }
  } else {
    alert("Judul tidak ditemukan");
  }
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOKS_ID);
  const listCompleted = document.getElementById(COMPLETED_BOOKS_ID);

  for (book of books) {
    const newBook = makeBooks(book.title, book.authors, book.year, book.isCompleted);
    newBook[BOOK_ITEM_ID] = book.id;

    if (book.isCompleted) {
      listCompleted.prepend(newBook);
    } else {
      listUncompleted.prepend(newBook);
    }
  }
}
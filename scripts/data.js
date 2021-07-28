const STORAGE_KEY = "BOOKS_SHELF";

let books = [];

function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert("Browser anda belum mendukung local storage. Silahkan gunakan browser lain.");
    return false
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);

  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(title, authors, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    authors,
    year,
    isCompleted
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId)
      return book;
  }

  return null;
}

function findBookIndex(bookId) {
  let index = 0
  for (book of books) {
    if (book.id === bookId)
      return index;

    index++;
  }

  return -1;
}

function findBookTitle(bookTitle) {
  const result = []
  for (book of books) {
    const title = book.title;
    strPos = title.toLowerCase().indexOf(bookTitle);
    if (strPos > -1)
      result.push(book);
  }

  return result;
}
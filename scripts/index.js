document.addEventListener("DOMContentLoaded", function () {

  const submitForm = document.getElementById("form");
  const searchForm = document.getElementById("searchForm")

  submitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBookByTitle();
  })

  if(isStorageExist()){
      loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
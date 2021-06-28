// Get the modal
let bookModal = document.getElementById("bookModal");

// Get the button that opens the modal
let addBookButton = document.getElementById("addBookButton");
let editBookButton = document.getElementById("editBookButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
addBookButton.onclick = function () {
    bookModal.classList.remove("hide");
    bookModal.classList.remove("hideModal");
    bookModal.classList.add("showModal")
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    bookModal.classList.remove("showModal");
    bookModal.classList.add("hideModal");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == bookModal) {
        bookModal.classList.remove("showModal");
        bookModal.classList.add("hideModal");
    }
}

editBookButton.onclick = function () {
    bookModal.classList.remove("hide");
    bookModal.classList.remove("hideModal");
    bookModal.classList.add("showModal")
}
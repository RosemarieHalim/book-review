function getBookData(bookString) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookString}&printType=books&maxResults=16`
  )
    .then((response) => {
      response.json().then((data) => {
        var arrayOfBooks = storeData(data);
        createListTwo(arrayOfBooks);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function storeData(data) {
  var arrayOfBooks = [];
  data.items.forEach((book) => {
    var bookDetails = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors[0],
      imageLink: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description,
      genre: book.volumeInfo.categories[0],
      averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
      published: book.volumeInfo.publishedDate,
      textSnippet: book.searchInfo.textSnippet,
    };
    arrayOfBooks.push(bookDetails);
  });
  return arrayOfBooks;
}

function createListTwo(bookData) {
  //if a list of books exists, remove it
  $("#book-list-container").remove();
  console.log(bookData);
  //create the three main containers for books and add bluma classes
  var mainBookListContainer = $("<div></div>")
    .addClass("container")
    .attr("id", "book-list-container");
  var columnsContainer = $("<div></div>").addClass(
    "columns is-multiline mt-6 has-text-centered is-family-primary"
  );
  $("#main-book-list-container").append(mainBookListContainer);
  mainBookListContainer.append(columnsContainer);

  //loop through the book array
  for (i = 0; i < bookData.length; i++) {
    //create elements for the img, title and author for each book
    var bookContainer = $("<div>").addClass("column is-6-tablet is-3-desktop");
    var bookImg = $("<img>")
      .attr("src", bookData[i].imageLink)
      .addClass("shadow list-img hover-book");
    var bookTitle = $("<h2>")
      .text(bookData[i].title)
      .addClass("hover-book-text book-title");
    var bookAuthor = $("<h3>").text("Author: " + bookData[i].authors);

    //append the elements to the page
    columnsContainer.append(bookContainer);

    bookContainer.append(bookImg);
    bookContainer.append(bookTitle);
    bookContainer.append(bookAuthor);
  }
}

// BURGER ELEMENT FUNCTION
function burger(x) {
  x.classList.toggle("change");
}

function formatUserInput(input) {
  //turn the string into an array and join it with "+"
  var inputAsArray = input.split(" ");
  return inputAsArray.join("+");
}

// listen for a submit event on the form
$("#myForm").on("submit", function (event) {
  //prevent the form from submitting
  event.preventDefault();
  //check if the input value is empty before continuing
  if ($("#myInput").val()) {
    //capture the users input
    var userInput = $("#myInput").val().trim();
    //clear the form input
    $("#myInput").val("");
    //call format user input
    userInput = formatUserInput(userInput);
    getBookData(userInput);
  }
});

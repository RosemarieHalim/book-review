//API call
function getBookData(bookString) {
  // saves the values of the data retreived fomr the call
  var arrayOfBooks = [];
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookString}&printType=books&maxResults=16`
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      data.items.forEach((book) => {
        var bookDetails = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors[0],
          imageLink: book.volumeInfo.imageLinks.thumbnail,
          description: book.volumeInfo.description,
          // genre: book.volumeInfo.categories[0],
          averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
          published: book.volumeInfo.publishedDate,
          //textSnippet: book.searchInfo.textSnippet,
          // isbn: book.items[0].volumeInfo.industryIdentifiers[1].industryIdentifier
          pages: book.volumeInfo.pageCount, //MODAL modification
        };
        arrayOfBooks.push(bookDetails);
        //createList();
      });
      createListTwo(arrayOfBooks);

      //MODAL functionality - generating the content based on the index number
      $("#main-book-list-container").on("click", "img", function () {
        console.log("Clicked image");
        $("#book-info-modal").addClass("is-active");

        var index = $(this).attr("data-index");

        $(".modal-card-title").text(arrayOfBooks[index].title);
        $(".modal-summary-body").text(arrayOfBooks[index].description);
        $(".modal .book-img").attr("src", arrayOfBooks[index].imageLink);
        $(".modal-tag-author").text(arrayOfBooks[index].authors);
        $(".modal-tag-pages").text(arrayOfBooks[index].pages);
        $(".modal-tag-published").text(arrayOfBooks[index].published);
      });
      //closing the MODAL
      $(".modal").on("click", ".delete", function () {
        console.log("you closed the modal");
        $("#book-info-modal").removeClass("is-active");
      }); //end of modal fuctionality
    });
  });
}

function createListTwo(bookData) {
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
    var bookContainer = $("<div>").addClass("column is-6-tablet is-3-desktop");
    var bookImg = $("<img>")
      .attr("data-index", i) // MODAL modification
      .attr("src", bookData[i].imageLink)
      .addClass("shadow list-img hover-book book-img");
    var bookTitle = $("<h2>")
      .text(bookData[i].title)
      .addClass("hover-book-text book-list-title");
    var bookAuthor = $("<h3>")
      .text("Author: " + bookData[i].authors)
      .addClass("hover-book-text");

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

function formatUserInput(input) {
  //turn the string into an array and join it with "+"
  var inputAsArray = input.split(" ");
  return inputAsArray.join("+");
}

//start of code to save a book to favorite book list
$(".modal-card-head").on("click", "#saveBookBtn", function () {
  console.log($(this));
  var favoritedBookInfo = {
    title: $(this).parent().find(".modal-card-title").text(),
    // author: $(this).parent().find(".author").text(),
    // image: $(this).parent().find(".img").text(),
    // description: $(this).parent().find(".description").text(),
    // reviews: $(this).parent().find(".reviews").text(),
    // purchaseLink: $(this).parent().find(".purchaselink").text(),
  };
  console.log(favoritedBookInfo);
  saveBook(favoritedBookInfo);
});

function saveBook(book) {
  console.log(book);
  //get the local storage data
  var existingItems = JSON.parse(localStorage.getItem("books"));
  //if there is no data set the array to empty
  if (existingItems === null) existingItems = [];
  //loop through the array, if the key of an object matches the data id being updated delete the object
  for (x = 0; x < existingItems.length; x++) {
    if (existingItems[x].title === book.title) {
      console.log("this book exists already");
      existingItems.splice(x, 1);
    }
  }
  //add the data object to the array
  existingItems.push(book);
  //set the array in local storage
  localStorage.setItem("books", JSON.stringify(existingItems));
  //modal to alert the book is saved goes here
}

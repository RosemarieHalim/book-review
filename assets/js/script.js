// Selecting the section where the book information goes
var bookListContainer = document.querySelector(".book-profiles-container"); // container for all the listed books

// saves the values of the data retreived fomr the call
var arrayOfBooks = [];

//API call
function getBookData(bookString) {
  console.log(bookString);
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookString}&printType=books&maxResults=15`
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      data.items.forEach((book) => {
        var bookDetails = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors[0],
          imageLink: book.volumeInfo.imageLinks.thumbnail,
          description: book.volumeInfo.description,
          genre: book.volumeInfo.categories[0],
          averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
          published: book.volumeInfo.publishedDate,
          // isbn: book.items[0].volumeInfo.industryIdentifiers[1].industryIdentifier
        };
        arrayOfBooks.push(bookDetails);
        createList();
      });
    });
  });
}

// create a section/card for every book from the API call
var createList = function () {
  for (let i = 0; i < arrayOfBooks.length; i++) {
    console.log(arrayOfBooks[i].title);

    var bookInfoContainer = document.createElement("div")
        bookInfoContainer.className = "book-info-container card py-3 mb-5"; //container for each book info

        var bookTitleEl = document.createElement("h2")
        bookTitleEl.className = "book-title card-header card-header-title is-size-2 py-4";
        bookTitleEl.textContent= arrayOfBooks[i].title    //and summaryTitleEl

    var summaryTitleEl = document.createElement("h3");
    summaryTitleEl.className = "p-3 summary-title is-size-3";
    summaryTitleEl.innerText = "Summary";

    var bookSummaryContainer = document.createElement("div");
    bookSummaryContainer.className = "summary-body p-3"; //container for the summary and book cover
    var bookSummaryEl = document.createElement("p");
    bookSummaryEl.className = "is-size-5";
    bookSummaryEl.textContent = arrayOfBooks[i].description;

    var bookCoverEl = document.createElement("img");
    bookCoverEl.setAttribute("src", arrayOfBooks[i].imageLink);

    // content for bookTagsContainer
    var bookTagsContainer = document.createElement("div");
    bookTagsContainer.className = "book-tags-container card-footer py-3";
    var tagGenreEl = document.createElement("p");
    tagGenreEl.className = "book-tag";
    tagGenreEl.innerHTML =
      "<p>Genre</p></br><tag>" + arrayOfBooks[i].genre + "</tag>";
    var tagAuthorEl = document.createElement("p");
    tagAuthorEl.className = "book-tag";
    tagAuthorEl.innerHTML =
      "<p>Author</p></br><tag>" + arrayOfBooks[i].authors + "</tag>";
    var tagPublishedEl = document.createElement("p");
    tagPublishedEl.className = "book-tag";
    tagPublishedEl.innerHTML =
      "<p>Published:</p></br><tag>" + arrayOfBooks[i].published + "</tag>";
    var tagRatingEl = document.createElement("p");
    tagRatingEl.className = "book-tag";
    tagRatingEl.innerHTML =
      "<p>Ratings</p></br><tag>" + arrayOfBooks[i].averageRating + "</tag>";
    // var tagIsbnEl = document.createElement("p")
    //     tagIsbnEl.className = "book-tag"
    //     tagIsbnEl.innerHTML = "<p class=is-danger>Genre</p></br><tag class=is-danger>"+ arrayOfBooks[i].isbn +"</tag>"

    bookSummaryContainer.append(bookSummaryEl, bookCoverEl);
    bookTagsContainer.append(
      tagGenreEl,
      tagAuthorEl,
      tagPublishedEl,
      tagRatingEl
    ); // perhaps adding tagIsbnEl
    bookInfoContainer.append(
      bookTitleEl,
      summaryTitleEl,
      bookSummaryContainer,
      bookTagsContainer
    );
    bookListContainer.append(bookInfoContainer);
  } //for loop ends
};

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
  //turn the string into an array
  var inputAsArray = input.split(" ");
  var formattedInput = "";
  //add a "+" to the end of each word except for the last word
  for (i = 0; i < inputAsArray.length; i++) {
    //if i + 1 is === inputAsArray.length we are at the last word, so only add the word then continue to end the loop
    if (i + 1 === inputAsArray.length) {
      formattedInput += inputAsArray[i];
      continue;
    }
    formattedInput += inputAsArray[i] + "+";
  }
  return formattedInput;
}

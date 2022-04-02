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
    //format user input
    userInput = formatUserInput(userInput);
    getBookData(userInput);
  }
});

function getBookData(input) {
  var arrayOfBooks = [];

  fetch(`https://www.googleapis.com/books/v1/volumes/?q=intitle:${input}`)
    .then((response) => {
      response.json().then((data) => {
        data.items.forEach((book) => {
          var bookDetails = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            imageLink: book.volumeInfo.imageLinks,
            description: book.volumeInfo.description,
            genre: book.volumeInfo.categories,
            averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
            numberOfRatings: book.volumeInfo.ratingsCount,
          };
          arrayOfBooks.push(bookDetails);
        });
      });
      console.log(arrayOfBooks);

      $("#mydiv").html("<img></img>").class
      ;
    })
    .catch((error) => {
      //some kind of error alert goes here, maybe a modal or just some red text under the form input element
    });
}

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

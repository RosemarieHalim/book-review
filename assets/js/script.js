
    // Variables from DOM
var bookNameInput = document.querySelector(".input")

var bookInfoEl = document.querySelector("#book-info-container") //the general information container for the book
var bookTitleEl = document.querySelector("#book-title")

var bookSummaryEl = document.querySelector("#book-summary") //the summary of the book
var bookImageEl = document.querySelector("#book-cover-img") // the cover image of the book

var bookTagGenreEl = document.querySelector("#book-tag-genere")
var bookTagAuthorEl = document.querySelector("#book-tag-author")
var bookTagTopicEl = document.querySelector("#book-tag-topic")
var bookTagLanguageEl = document.querySelector("#book-tag-language")
 
    // API call
fetch(
    `https://www.googleapis.com/books/v1/volumes/?q=intitle:harry+potter`
  ).then((response) => {
    response.json().then((data) => {
    //   console.log(data);
  
      var arrayOfBooks = [];
  
      data.items.forEach((book) => {
        var bookDetails = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          imageLink: book.volumeInfo.imageLinks.thumbnail,
          description: book.volumeInfo.description,
          genre: book.volumeInfo.categories,
          averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
          numberOfRatings: book.volumeInfo.ratingsCount,
        };
        arrayOfBooks.push(bookDetails);
        console.log(bookDetails)
      });
    });
  });

// BURGER ELEMENT FUNCTION
function burger(x) {
    x.classList.toggle("change");
}




//     // example of an API call from google, serching by the words included in the Book Tile 
// fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:the+name+wind&printType=books&maxResults=40").then(
//     (response) => {
//       response.json().then((data) => {
//           console.log("GOOGLE DATA seach by title and gives ID:");
//           console.log(data);
//           var bookId = data.items[0].volumeInfo.industryIdentifiers[0].identifier
//           console.log(data.items[0].searchInfo.textSnippet)

//             //example of an API call from open library using ISBN:9780756413712 identifier as parameter
//         fetch("https://openlibrary.org/api/books?bibkeys=ISBN:"+bookId+"&jscmd=details&format=json").then(
//             (response) => {
//             response.json().then((data) => {
//                 console.log("OPEN LIBRARY DATA by identifier");
//                 console.log(data);
//             });
//             }
//         );
//       });
//     }
//   );

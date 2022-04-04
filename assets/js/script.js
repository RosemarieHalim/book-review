
    // Selecting the section where the book information goes
var bookListContainer = document.querySelector(".book-profiles-container") // container for all the listed books
    
    // saves the values of the data retreived fomr the call
var arrayOfBooks = [];

    //API call 
fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:wolf+winter&printType=books&maxResults=3")
.then((response) => {
    response.json().then((data) => {
        console.log(data)
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

    // create a section/card for every book from the API call
var createList = function (){
    for (let i = 0; i < arrayOfBooks.length; i++) {
        console.log(arrayOfBooks[i].title)

    var bookInfoContainer = document.createElement("div")
        bookInfoContainer.className = "book-info-container card pb-3git add"; //container for each book info

        var bookTitleEl = document.createElement("h2")
        bookTitleEl.className = "book-title card-header card-header-title is-size-2";
        bookTitleEl.textContent= arrayOfBooks[i].title    //and summaryTitleEl

        var summaryTitleEl = document.createElement("h3")
        summaryTitleEl.className = "p-3 summary-title is-size-3"
        summaryTitleEl.innerText = "Summary" 


        var bookSummaryContainer = document.createElement("div")
        bookSummaryContainer.className = "summary-body p-3" //container for the summary and book cover
            var bookSummaryEl = document.createElement("p")
            bookSummaryEl.className = "is-size-5"
            bookSummaryEl.textContent= arrayOfBooks[i].description

            var bookCoverEl = document.createElement("img")
            bookCoverEl.setAttribute("src", arrayOfBooks[i].imageLink)
    
        // content for bookTagsContainer 
        var bookTagsContainer = document.createElement("div")
        bookTagsContainer.className = "book-tags-container card-footer" 
            var tagGenreEl = document.createElement("p")
                tagGenreEl.className = "book-tag"
                tagGenreEl.innerHTML = "<p>Genre</p></br><tag>"+ arrayOfBooks[i].genre +"</tag>"
            var tagAuthorEl = document.createElement("p")
                tagAuthorEl.className = "book-tag"
                tagAuthorEl.innerHTML = "<p>Author</p></br><tag>"+ arrayOfBooks[i].authors +"</tag>"
            var tagPublishedEl = document.createElement("p")
                tagPublishedEl.className = "book-tag"
                tagPublishedEl.innerHTML = "<p>Published:</p></br><tag>"+ arrayOfBooks[i].published +"</tag>"
            var tagRatingEl = document.createElement("p")
                tagRatingEl.className = "book-tag"
                tagRatingEl.innerHTML = "<p>Ratings</p></br><tag>"+ arrayOfBooks[i].averageRating +"</tag>"
            // var tagIsbnEl = document.createElement("p")
            //     tagIsbnEl.className = "book-tag"
            //     tagIsbnEl.innerHTML = "<p class=is-danger>Genre</p></br><tag class=is-danger>"+ arrayOfBooks[i].isbn +"</tag>"

    bookSummaryContainer.append(bookSummaryEl, bookCoverEl)
    bookTagsContainer.append(tagGenreEl, tagAuthorEl, tagPublishedEl, tagRatingEl ) // perhaps adding tagIsbnEl
    bookInfoContainer.append(bookTitleEl, summaryTitleEl, bookSummaryContainer, bookTagsContainer)
    bookListContainer.append(bookInfoContainer)
    }//for loop ends
};


// BURGER ELEMENT FUNCTION
function burger(x) {
    x.classList.toggle("change");
}

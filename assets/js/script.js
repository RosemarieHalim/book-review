var arrayOfBooks = [];
// listen for a submit event on the form
$("#myForm").on("submit", function (event) {
  //prevent the form from submitting
  event.preventDefault();
  //check if the input value is empty before continuing
  if ($("#myInput").val()) {
    //capture the users input
    var userInput = $("#myInput").val().trim().split(" ").join("+");
    getBookData(userInput);
  }
});

$("#main-book-list-container").on("click", "img", function () {
  //if the img clicked has an id of errorEl it is the no results img, so on click dont display the info modal
  if ($(this).attr("id") === "errorEl") {
    return;
  }
  $("#book-info-modal").addClass("is-active");

  var index = $(this).attr("data-index");
  // $(".book-mark-icon").attr("src", "./assets/img/bookmark.png");

  $("#book-info-modal .modal-card-title").text(arrayOfBooks[index].title);
  $("#book-info-modal .modal-summary-body").text(
    arrayOfBooks[index].description
  );
  $("#book-info-modal .book-img").attr("src", arrayOfBooks[index].imageLink);
  $("#book-info-modal .modal-tag-author").text(arrayOfBooks[index].authors);
  $("#book-info-modal .modal-tag-pages").text(arrayOfBooks[index].pages);
  $("#book-info-modal .modal-tag-published").text(
    arrayOfBooks[index].published
  );
  $(".modal-tag-buy a").attr("href", arrayOfBooks[index].link);

  var bookExistingTitles = JSON.parse(localStorage.getItem("books"));
  $("#saveBookBtn").attr("src", "./assets/img/bookmark.png");

  bookExistingTitles.forEach((book) => {
    if (
      $("#book-info-title").text() == book.title &&
      $(".modal-summary-body").text() === book.description
    ) {
      $("#saveBookBtn").attr("src", "./assets/img/bookmark-clicked.png");
    }
  });
});
//closing the MODAL
$("#book-info-modal").on("click", ".delete", function () {
  $("#book-info-modal").removeClass("is-active");
}); //end of modal fuctionality

//API call
function getBookData(userInput) {
  // saves the values of the data retreived fomr the call
  arrayOfBooks = [];
  fetch(
    "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
      userInput +
      "&printType=books&maxResults=16"
  ).then((response) => {
    response
      .json()
      .then((data) => {
        getBookClub(); //fetched the API call for random user information
        data.items.forEach((book) => {
          var bookDetails = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors[0] ?? "No Author Found",
            imageLink:
              book.volumeInfo.imageLinks.thumbnail ??
              "./assets/img/no-cover.svg",
            description: book.volumeInfo.description,
            averageRating: book.volumeInfo.averageRating + " Out Of 5 Stars",
            published: book.volumeInfo.publishedDate,
            link: book.volumeInfo.infoLink,
            textSnippet: book.searchInfo.textSnippet,
            pages: book.volumeInfo.pageCount, //MODAL modification
          };
          arrayOfBooks.push(bookDetails);
        });

        createListTwo(arrayOfBooks);
      })
      .catch((err) => {
        if (arrayOfBooks.length === 0) {
          $("#main-book-list-container").html("");
          userInput = userInput.split("+").join(" ");
          var errorMsg = $("<h2>")
            .text("Oops, no results for '" + userInput + "',  please try again")
            .addClass("is-size-4 mt-5");
          var errorDivContainer = $("<div>").addClass(
            "is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          );
          var errorImg = $("<img>").attr({
            src: "/assets/img/no-results.jpg",
            id: "errorEl",
          });

          $("#main-book-list-container").append(errorDivContainer);
          errorDivContainer.append(errorMsg);
          errorDivContainer.append(errorImg);
        } else createListTwo(arrayOfBooks);
      });
  });
  //MODAL functionality - generating the content based on the index number
}

function createListTwo(bookData) {
  //remove all content from the main section before adding anything new
  $("#main-book-list-container").html("");
  //create the three main containers for books and add bulma classes
  var mainBookListContainer = $("<div></div>")
    .addClass("container")
    .attr("id", "book-list-container");
  var columnsContainer = $("<div></div>").addClass(
    "columns is-multiline mt-6 has-text-centered is-family-primary"
  );
  $("#main-book-list-container").append(mainBookListContainer);
  mainBookListContainer.append(columnsContainer);

  //loop through the book array nad create elements for each book result
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
    var bookClubBtn = $("<button>") // MODAL modification, button for the book club
      .text("Join The Book Club")
      .attr("data-index", i) // MODAL modification, assigns an index number based on the position
      .addClass("button is-warning is-light is-small");

    columnsContainer.append(bookContainer);

    bookContainer.append(bookImg);
    bookContainer.append(bookTitle);
    bookContainer.append(bookAuthor);
    bookContainer.append(bookClubBtn); // MODAL modification apppends book club button,
  }
}

// BURGER ELEMENT FUNCTION
function burger(x) {
  x.classList.toggle("change");
}

// var moderatorInfo = []
var getBookClub = function () {
  var moderatorInfo = []; // MODAL book Club - hold the data for the random user generatoior
  // api for a random user 2nd API call
  fetch("https://random-data-api.com/api/users/random_user?size=16").then(
    (response) => {
      response.json().then((data) => {
        for (i = 0; i < data.length; i++) {
          var userDetails = {
            name: data[i].first_name + " " + data[i].last_name,
            email: data[i].email,
            phone: data[i].phone_number,
            address:
              data[i].address.street_address +
              ", " +
              data[i].address.state +
              ", " +
              data[i].zip_code +
              ", " +
              data[i].address.country +
              ".",
            avatar: data[i].avatar,
          };
          moderatorInfo.push(userDetails);
        }
      }); //end of for each loop
      // Book Club Modal button functionality
      $("#main-book-list-container").on("click", "button", function () {
        $("#book-club-modal").addClass("is-active");

        var index = $(this).attr("data-index");
        $("#book-club-modal .modal-card-title").text(
          moderatorInfo[index].name + " - (Contact Moderator)"
        );
        $("#book-club-modal img").attr("src", moderatorInfo[index].avatar);
        // create content for the contact infomration
        $(".book-club-info").html("");
        $(".book-club-info").append(
          $("<p>").text(moderatorInfo[index].email).addClass("mb-3"),
          $("<p>").text(moderatorInfo[index].phone).addClass("mb-3"),
          $("<p>").text(moderatorInfo[index].address).addClass("mb-3")
        );
      });
      //closing the modal
      $("#book-club-modal").on("click", ".delete", function (event) {
        $("#book-club-modal").removeClass("is-active");
      });
    }
  );
}; //end of MODAL functionality for Book Club

//start of code to save a book to favorite book list
$(".modal-card-head").on("click", "#saveBookBtn", function () {
  $("#saveBookBtn").attr("src", "./assets/img/bookmark-clicked.png");

  var favoritedBookInfo = {
    title: $("#book-info-modal .modal-card-title").text(),
    author: $(".modal-tag-author").text(),
    description: $(".modal-summary-body").text(),
    pageCount: $(".modal-tag-pages").text(),
    purchaseLink: $(".modal-tag-buy").text(),
    published: $(".modal-tag-published").text(),
    imgLink: $(this).parent().parent().find(".book-img").attr("src"),
  };

  saveBook(favoritedBookInfo);
});

function saveBook(book) {
  //get the local storage data
  var existingItems = JSON.parse(localStorage.getItem("books"));
  //if there is no data set the array to empty
  if (existingItems === null) existingItems = [];
  //loop through the array, if the key of an object matches the data id being updated delete the object
  for (x = 0; x < existingItems.length; x++) {
    if (
      existingItems[x].title === book.title &&
      existingItems[x].description === book.description
    ) {
      existingItems.splice(x, 1);
    }
  }
  //add the data object to the array
  existingItems.push(book);

  //set the array in local storage
  localStorage.setItem("books", JSON.stringify(existingItems));

  displayReadingList();
}

// // KEEP BOOK FUNCTION
// var deleteBtn = document.createElement("button");
<<<<<<< HEAD
// var deleteBtnArray = [];

// function keepTitle() {
//   console.log("f")
//   var keys = Object.keys(localStorage);
//   var keyLength = keys.length;
//   while (keyLength--) {
//     var bookLi = document.createElement("li");
//     var deleteBtn = document.createElement("button");
//     deleteBtn.className = "erase";
//     deleteBtn.innerHTML = "x";
//     bookLi.textContent = localStorage.getItem(keys[keyLength]);
//     bookLi.setAttribute("id", keys[keyLength]);
//     deleteBtn.setAttribute("style", "display: none; margin: 5px;");
//     deleteBtn.addEventListener("click", function (e) {
//       localStorage.removeItem(e.target.parentNode.id);
//       e.target.parentNode.remove();
//     });
//     deleteBtnArray.push(deleteBtn);
//     document.getElementById("bookmarkList").append(bookLi);
//     document.getElementById(keys[keyLength]).append(deleteBtn);
//   }
// }

// // TRASH FUNCTION
// var visible = false;

// function editList() {
//   console.log("g")
//   var editBtn = document.getElementById("editList");
//   editBtn.innerHTML = "Edit List";
//   editBtn.addEventListener("click", function (e) {
//     if (!visible) {
//       visible = true;
//       deleteBtnArray.forEach((element) =>
//         element.setAttribute("style", "display: inline;")
//       );
//       editBtn.innerHTML = "Cancel";
//     } else {
//       visible = false;
//       deleteBtnArray.forEach((element) =>
//         element.setAttribute("style", "display: none;")
//       );
//       editBtn.innerHTML = "Edit List";
//     }
//   });
// }

// editList();
// keepTitle();

function displayReadingList() {
  var books = JSON.parse(localStorage.getItem("books"));
  if (books === null) {
    return;
    // you have no books bookmarked!
  }
  for (i = 0; i < books.length; i++) {
    var hr = $("<hr>").css("color", "white");
    var bmListContainer = $("<div>").addClass(
      "is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-3"
    );

    var bmListImage = $("<img>").attr("src", books[i].imgLink);
    var bmListTitle = $("<h2>")
      .addClass("mb-2 has-text-centered is-capitalized")
      .text(books[i].title);
    $("#bookmarkList").append(bmListContainer);
    bmListContainer.append(bmListTitle);
    bmListContainer.append(bmListImage);
    bmListContainer.after(hr);
  }
}
//displayReadingList();
=======

// function keepTitle() {
//   var keys = Object.keys(localStorage);
//   var keyLength = keys.length;
//   while (keyLength--) {
//     var bookLi = document.createElement("li");
//
//     deleteBtn.className = "erase";
//     deleteBtn.innerHTML = "x";
//     bookLi.innerHTML = displayBook(keys, keyLength);
//     bookLi.setAttribute("id", keys[keyLength]);
//     deleteBtn.setAttribute("style", "display: none; margin: 5px;");
//     deleteBtn.addEventListener("click", function (e) {
//       localStorage.removeItem(e.target.parentNode.id);
//       e.target.parentNode.remove();
//     });
//     deleteBtnArray.push(deleteBtn);
//     document.getElementById("bookmarkList").append(bookLi);
//     document.getElementById(keys[keyLength]).append(deleteBtn);
//   }
// }

// keepTitle();

var deleteBtnArray = [];

function displayReadingList() {
  var books = JSON.parse(localStorage.getItem("books"));
  console.log(books);
  var array = $(".title-for-list")
    .map(function () {
      return $.trim($(this).text());
    })
    .get();
  console.log(array);
  if (!books) return;

  for (i = 0; i < books.length; i++) {
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "erase";
    deleteBtn.innerHTML = "x";
    deleteBtn.setAttribute("style", "display: none; margin: 5px;");

    deleteBtnArray.push(deleteBtn);
    var hr = $("<hr>");
    var bmListContainer = $("<div>").addClass(
      "is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-3"
    );
    var bmListImage = $("<img>").attr("src", books[i].imgLink);
    var bmListTitle = $("<h2>")
      .addClass(
        "mb-2 has-text-centered is-capitalized title-for-list no-border"
      )
      .text(books[i].title);
    $("#bookmarkList").append(bmListContainer);
    bmListContainer.append(bmListTitle);
    bmListContainer.append(deleteBtn);
    bmListContainer.append(bmListImage);
    bmListContainer.after(hr);
    for (x = 0; x < array.length; x++) {
      if (array[x] === books[i].title) {
        bmListContainer.remove();
        hr.remove();
      }
    }
    deleteBtn.addEventListener("click", function (e) {
      console.log("click");
      console.log(e.target.parentNode);
      localStorage.removeItem(e.target.parentNode.id);
      e.target.parentNode.remove();
    });
  }
}

displayReadingList();

// TRASH FUNCTION
var visible = false;

function editList() {
  var editBtn = document.getElementById("editList");
  editBtn.innerHTML = "Edit List";
  editBtn.addEventListener("click", function (e) {
    if (!visible) {
      visible = true;
      deleteBtnArray.forEach((element) =>
        element.setAttribute("style", "display: inline;")
      );
      editBtn.innerHTML = "Cancel";
    } else {
      visible = false;
      deleteBtnArray.forEach((element) =>
        element.setAttribute("style", "display: none;")
      );
      editBtn.innerHTML = "Edit List";
    }
  });
}
editList();
>>>>>>> develop

//API call
function getBookData(userInput) {
    // saves the values of the data retreived fomr the call
    console.log(userInput)
    var arrayOfBooks = [];
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:"+userInput+"&printType=books&maxResults=16"
    ).then((response) => {
      response.json().then((data) => {

        getBookClub()
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
            $("#main-book-list-container").on("click", "img", function(){
                $("#book-info-modal").addClass("is-active")

                var index = $(this).attr("data-index")
                $("#book-info-modal .modal-card-title").text(arrayOfBooks[index].title);
                $("#book-info-modal .modal-summary-body").text(arrayOfBooks[index].description);
                $("#book-info-modal img").attr("src", arrayOfBooks[index].imageLink);
                $("#book-info-modal .modal-tag-author").text(arrayOfBooks[index].authors);
                $("#book-info-modal .modal-tag-pages").text(arrayOfBooks[index].pages);
                $("#book-info-modal .modal-tag-published").text(arrayOfBooks[index].published);
            });
                //closing the MODAL
            $("#book-info-modal").on("click", ".delete", function(){
            $("#book-info-modal").removeClass("is-active")
            }) //end of modal fuctionality
      });
    });
  }
  
  function createListTwo(bookData) {
    $("#book-list-container").remove();
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
        .attr("data-index", i) // MODAL modification, assigns an index number based on the position 
        .attr("src", bookData[i].imageLink)
        .addClass("shadow list-img hover-book");
      var bookTitle = $("<h2>")
        .text(bookData[i].title)
        .addClass("hover-book-text");
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
      bookContainer.append(bookClubBtn); // MODAL modification,
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
      var userInput = $("#myInput").val().replace(" ", "+")
                                    // //clear the form input
                                    // $("#myInput").val("");
                                    // //call format user input
                                    // userInput = formatUserInput(userInput);
        getBookData(userInput);
    }
  });
  
                                        // function formatUserInput(input) {
                                        //     //turn the string into an array
                                        //     var inputAsArray = input.split(" ");
                                        //     var formattedInput = "";
                                        //     //add a "+" to the end of each word except for the last word
                                        //     for (i = 0; i < inputAsArray.length; i++) {
                                        //     //if i + 1 is === inputAsArray.length we are at the last word, so only add the word then continue to end the loop
                                        //     if (i + 1 === inputAsArray.length) {
                                        //         formattedInput += inputAsArray[i];
                                        //         continue;
                                        //     }
                                        //     formattedInput += inputAsArray[i] + "+";
                                        //     }
                                        //     return formattedInput;
                                        // }


  var moderatorInfo = []
// var moderatorInfo = []
var getBookClub = function (){
    // api for a random user 2nd API call
fetch("https://random-data-api.com/api/users/random_user?size=16").then(
    (response) => {
    response.json().then((data) => {

      for (i = 0; i<data.length; i++){
    var userDetails = {
      name: data[i].first_name +" " + data[i].last_name,
      email: data[i].email,
      phone: data[i].phone_number,
      address: data[i].address.street_address +", "+ data[i].address.state +", "+ data[i].zip_code +", "+ data[i].address.country+".",
      avatar: data[i].avatar
        }
        moderatorInfo.push(userDetails);
    };
      }); //end of for each loop
            // Book Club Modal button functionality
      $("#main-book-list-container").on("click", "button", function (){
        $("#book-club-modal").addClass("is-active");

        var index = $(this).attr("data-index")
        $("#book-club-modal .modal-card-title").text(moderatorInfo[index].name +" - (Contact Moderator)");
        $("#book-club-modal img").attr("src", moderatorInfo[index].avatar);
            // create content for the contact infomration
        $(".book-club-info").html("")
        $(".book-club-info").append(
            $("<p>").text(moderatorInfo[index].email),
            $("<p>").text(moderatorInfo[index].phone),
            $("<p>").text(moderatorInfo[index].address))
      });
            //closing the modal
      $("#book-club-modal").on("click", ".delete", function (event){
        $("#book-club-modal").removeClass("is-active");
      })
    });
    }

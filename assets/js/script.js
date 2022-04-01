fetch(
  `https://www.googleapis.com/books/v1/volumes/?q=intitle:harry+potter`
).then((response) => {
  response.json().then((data) => {
    console.log(data);

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
    });
  });
});

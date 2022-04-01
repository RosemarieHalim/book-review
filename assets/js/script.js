

// example of an API call from google
fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:philosopher+stone&printType=books&maxResults=40").then(
    (response) => {
      response.json().then((data) => {
          console.log("gOOGLE DATA in tittle");
          console.log(data);
      });
    }
  );

  
// example of an API call from open library using ISBN:9780756413712 identifier as parameter
fetch("https://openlibrary.org/api/books?bibkeys=ISBN:9780756413712&jscmd=details&format=json").then(
    (response) => {
      response.json().then((data) => {
          console.log("OPEN LIBRARY DATA");
          console.log(data);
      });
    }
  );


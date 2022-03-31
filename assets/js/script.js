let input = "love";
fetch(`https://www.googleapis.com/books/v1/volumes/?q=${input}`).then(
  (response) => {
    response.json().then((data) => {
        console.log("gOOGLE DATA");
        console.log(data);
    });
  }
);

fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:life+after").then(
    (response) => {
      response.json().then((data) => {
          console.log("gOOGLE DATA in tittle");
          console.log(data);
      });
    }
  );


let key = "clDs6fwfqKr0Y0PRfKe3UbdrkvPt6wwd";

var bookName = 

fetch("https://api.nytimes.com/svc/books/v3/reviews.json?title=life&api-key="+key).then(
  (response) => {
    response.json().then((data) => {
        console.log("NYT DATA");
        console.log(data);
    });
  }
);
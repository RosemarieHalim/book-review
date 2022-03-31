// let input = "harrypotter";
// fetch(`https://www.googleapis.com/books/v1/volumes/?q=${input}`).then(
//   (response) => {
//     response.json().then((data) => {
//         console.log("gOOGLE DATA");
//         console.log(data);
//     });
//   }
// );

let key = "clDs6fwfqKr0Y0PRfKe3UbdrkvPt6wwd";
fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key="+key).then(
  (response) => {
    response.json().then((data) => {
        console.log("NYT DATA");
        console.log(data);
    });
  }
);
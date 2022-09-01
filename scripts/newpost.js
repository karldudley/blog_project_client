//giphy api key
let APIKEY = "5rOj5wnf6ba5PRgcSmo3sQoXBK4St48P";

document.querySelector('#gifForm').addEventListener('keypress', findGif);

function findGif (ev) {
  if (ev.key === 'Enter') {
    ev.preventDefault(); //to stop the page reload

    let url = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("gifForm").value.trim();
    url = url.concat(str);

    fetch(url)
      .then(response => response.json())
      .then(content => {
        let gifDiv = document.getElementById("E")
        let img = document.createElement("img");
        let gifURL = document.querySelector("form .story-details h1")
        gifURL.textContent = content.data[0].images.downsized.url
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        gifDiv.textContent="";
        gifDiv.appendChild(img);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

// create a new post and send it to server

const form = document.querySelector('form');
form.addEventListener('submit', submitPost);

function submitPost(e){
    e.preventDefault();
    let gifURL = document.querySelector("form .story-details h1").textContent;
    const postData = {
        title: document.getElementById('titleForm').value,
        description: document.getElementById('descriptionForm').value,
        content: document.getElementById('contentForm').value,
        gif: gifURL
    };
    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://granny-smith-server.herokuapp.com/posts', options)
        .then(r => r.json())
        .then((data) => {
          console.log('Success:', data);
          window.location.href = "./posts.html";
        })
        .catch(console.warn)
}

module.exports = {
  submitPost,
  findGif
}

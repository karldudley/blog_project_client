//giphy api key
let APIKEY = "5rOj5wnf6ba5PRgcSmo3sQoXBK4St48P";

document.querySelector('#gifForm').addEventListener('keypress', findGif);

function findGif (ev) {
  if (ev.key === 'Enter') {
    ev.preventDefault(); //to stop the page reload

    let url = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${APIKEY}&limit=10&q=`;
    let str = document.getElementById("gifForm").value.trim();
    url = url.concat(str);

    fetch(url)
      .then(response => response.json())
      .then(content => {
        const gifs = content.data;
        gifs.forEach((gif, index) => {
          let currentIndex = index;
         
          let gifDiv = document.getElementById("E")
          let img = document.createElement("img");
          let gifURL = document.querySelector("form .story-details h1")
          const prevGifButton = document.createElement('button');
          prevGifButton.className = ('previous');
          prevGifButton.type = 'button';
          const prevArrow = document.createElement('img');
          prevArrow.id = ('prevArrow');
          prevArrow.src = '../assets/left.png';
          prevArrow.alt = 'Left arrow icon';
          prevGifButton.appendChild(prevArrow);
          const nextGifButton = document.createElement('button');
          nextGifButton.type = 'button';
          const nextArrow = document.createElement('img');
          nextArrow.id = ('prevArrow');
          nextArrow.src = '../assets/right.png';
          nextArrow.alt = 'Left arrow icon';
          nextGifButton.appendChild(nextArrow);
          nextGifButton.className = ('next');
          gifURL.textContent = gif.images.downsized.url
          img.src = gif.images.downsized.url;
          img.alt = gif.title;
          gifDiv.textContent="";

          prevGifButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = gifs.length - 1;
            }
            let currentGif = gifs[currentIndex];
            gifURL.textContent = currentGif.images.downsized.url
            img.src = currentGif.images.downsized.url;
            img.alt = currentGif.title;
          });
          gifDiv.appendChild(prevGifButton);

          nextGifButton.addEventListener('click', () => {
            currentIndex++;
            console.log(currentIndex)
            if (currentIndex >= gifs.length) {
              currentIndex = 0;
            }
            let currentGif = gifs[currentIndex];
            gifURL.textContent = currentGif.images.downsized.url
            img.src = currentGif.images.downsized.url;
            img.alt = currentGif.title;
          });
          gifDiv.appendChild(nextGifButton);
          gifDiv.appendChild(img);
        })
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

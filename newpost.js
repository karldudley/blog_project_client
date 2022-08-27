//giphy api key
let APIKEY = "5rOj5wnf6ba5PRgcSmo3sQoXBK4St48P";

// search for a gif
document.getElementById("gifButton").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    let url = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("gifForm").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fc.textContent = content.data[0].images.downsized.url;
        fig.appendChild(img);
        fig.appendChild(fc);
        let out = document.querySelector(".out");
        out.innerHTML = "";
        out.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#gifForm").value = "";
      })
      .catch(err => {
        console.error(err);
      });
});

// create a new post and send it to server
const form = document.querySelector('#form');
form.addEventListener('submit', submitPost);

function submitPost(e){
    e.preventDefault();
    let gifURL = document.querySelector("figcaption").innerText

    const postData = {
        title: e.target.titleForm.value,
        description: e.target.description.value,
        content: e.target.contentForm.value,
        gif: gifURL
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        // .then(appendPost)
        .catch(console.warn)
};

// // helpers
// function appendCats(cats){
//     cats.forEach(appendCat);
// };

// function appendPost(catData){
//     const newLi = document.createElement('li');
//     newLi.textContent = `Name: ${catData.name} || Age: ${catData.age}`
//     const catsList = document.querySelector('ul');
//     catsList.append(newLi);
// };

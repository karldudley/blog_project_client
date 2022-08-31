loadPosts();
const commentBoxes = document.getElementsByClassName('comments');
const commentSection = document.getElementsByClassName('comments-section');

for (let i = 0; i < commentBoxes.length; i++) {
    console.log(i);
    commentBoxes[i].addEventListener('click', openComments.bind(this, i));
}

function loadPosts() {
    fetch('https://granny-smith-server.herokuapp.com/posts')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then (data => {
            let postData = data.posts;
            console.log(postData);
            const postSelector = document.querySelector('.posts');
            postData.reverse().forEach(post => {
                const postCard = document.createElement('div');
                postCard.className = 'shadow card post';
                postSelector.appendChild(postCard);
                const postHeader = document.createElement('div');
                postHeader.className = 'post-header';
                const postTitle = document.createElement('h4');
                postTitle.class = 'postTitle';
                postTitle.textContent = post.title + " | " + post.description;
                postHeader.appendChild(postTitle);
                postCard.appendChild(postHeader);
                const postContent = document.createElement('div');
                postContent.className = 'post-content';
                const postText = document.createElement('p');
                postContent.appendChild(postText);
                postText.textContent = post.content;

                if (post.gif.search("http") != -1) {
                    const postGif = document.createElement('img');
                    postGif.src = post.gif;
                    postContent.appendChild(postGif);
                }
                

                postHeader.insertAdjacentElement('afterend', postContent);
                const postFooter = document.createElement('div');
                postFooter.className = 'post-footer';
                const postComments = document.createElement('p');
                postComments.className = 'comments';
                postComments.textContent = 'Comments';
                postFooter.appendChild(postComments);
                const postButtons = document.createElement('div');
                postButtons.className = 'post-buttons';
                const thumbsUp = document.createElement('button');
                thumbsUp.textContent = '👍';
                const thumbsDown = document.createElement('button');
                thumbsDown.textContent = '👎'
                const fire = document.createElement('button');
                fire.textContent = '🔥';
                postButtons.appendChild(thumbsUp);
                postButtons.appendChild(thumbsDown);
                postButtons.appendChild(fire);
                postFooter.appendChild(postButtons);
                postContent.insertAdjacentElement('afterend', postFooter);
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comments-section'; 
                postFooter.insertAdjacentElement('afterend', commentDiv);
                console.log(postSelector);
            })
            const commentBoxes = document.getElementsByClassName('comments');
            const commentSection = document.getElementsByClassName('comments-section');
            for (let i = 0; i < commentBoxes.length; i++) {
                console.log(i);
                commentBoxes[i].addEventListener('click', openComments.bind(this, i));
            }
        });
}

function openComments(number) {
    /*for (let comment of comments){

    }*/
    const comment = document.createElement('p');
    const addComment = document.createElement('input');
    addComment.type = "text";
    addComment.className = "newComment";
    addComment.placeholder = "Add your own comment here!";
    comment.className = "commentBox";
    comment.innerText = 'Hello I am open';
    for (let j = 0; j <= commentSection.length; j++) {
        if (number === j && commentSection[j].innerHTML.trim() === '') {
            commentSection[j].appendChild(comment);
            commentSection[j].appendChild(addComment);
        }
        else {
            commentSection[j].innerHTML = '';
        }
    }
}

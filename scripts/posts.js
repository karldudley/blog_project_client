loadPosts();

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
            const postSelector = document.querySelector('.posts');
            postData.reverse().forEach(post => {
                
                //Post base
                const postCard = document.createElement('div');
                postCard.className = 'shadow card post';
                postSelector.appendChild(postCard);

                //Post header
                const postHeader = document.createElement('div');
                postHeader.className = 'post-header';
                const postTitle = document.createElement('h4');
                postTitle.className = 'postTitle';
                postTitle.textContent = post.title;
                const postDescription = document.createElement('h5');
                postDescription.textContent = post.description;
                postHeader.appendChild(postTitle);
                postHeader.appendChild(postDescription)
                const close = document.createElement('span');
                close.className = "close-btn";
                close.textContent = 'X';
                close.addEventListener('click', sendDelete.bind(this, post.id, data.posts.length));
                postHeader.appendChild(close);
                postCard.appendChild(postHeader);

                //Post content
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

                //Post footer
                const postFooter = document.createElement('div');
                postFooter.className = 'post-footer';
                const postComments = document.createElement('p');
                postComments.className = 'comments';
                postComments.textContent = 'See all comments';
                postFooter.appendChild(postComments);
                const postButtons = document.createElement('div');
                postButtons.className = 'post-buttons';
                
                //Like button
                const likeButton = document.createElement('div');
                const likeCounter = document.createElement('span');
                likeCounter.textContent = (post.emojis[0])['up'];
                const thumbsUp = document.createElement('button');
                thumbsUp.textContent = '????';
                likeButton.appendChild(likeCounter);
                likeButton.appendChild(thumbsUp);
                postButtons.appendChild(likeButton);
                thumbsUp.addEventListener('click', sendEmoji.bind(this, post.id, 'up', likeCounter, thumbsUp), );
               
                //Dislike button
                const dislikeButton = document.createElement('div');
                const dislikeCounter = document.createElement('span');
                dislikeCounter.textContent = (post.emojis[0])['down'];
                const thumbsDown = document.createElement('button');
                thumbsDown.textContent = '????';
                dislikeButton.appendChild(dislikeCounter);
                dislikeButton.appendChild(thumbsDown);
                likeButton.insertAdjacentElement('afterend', dislikeButton);
                thumbsDown.addEventListener('click', sendEmoji.bind(this, post.id, 'down', dislikeCounter, thumbsDown));
                
                //Fav button
                const favButton = document.createElement('div');
                const favCounter = document.createElement('span');
                favCounter.textContent = (post.emojis[0])['favourite'];
                const fire = document.createElement('button');
                fire.textContent = '????';
                favButton.appendChild(favCounter);
                favButton.appendChild(fire);
                fire.addEventListener('click', sendEmoji.bind(this, post.id, 'favourite', favCounter, fire));
                dislikeButton.insertAdjacentElement('afterend', favButton);

                postFooter.appendChild(postButtons);
                postContent.insertAdjacentElement('afterend', postFooter);

                //Comments section
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comments-section'; 
                postFooter.insertAdjacentElement('afterend', commentDiv);
            })
            const commentBoxes = document.getElementsByClassName('comments');
            for (let i = 0; i < commentBoxes.length; i++) {
                commentBoxes[i].addEventListener('click', openComments.bind(this, i, postData[i]));

            }
        });
}

function openComments(id, post) {
    const commentSection = document.getElementsByClassName('comments-section');
    const comments = document.createElement('div');
    const addComment = document.createElement('input');
    let comment;
    addComment.addEventListener('keypress', (event) => {
        var key = event.key;
        if (key === 'Enter' && addComment.value !== '') {
            (post.comments).push(addComment.value);
            comment = document.createElement('p');
            comment.innerText = addComment.value;
            comments.prepend(comment);
            sendComment(post.id, addComment.value);
            event.currentTarget.value = '';
        }
    });
    for (let commentData of post.comments) {
        comment = document.createElement('p');
        commentData.comment ? comment.innerText = commentData.comment : comment.innerText = commentData;
        comments.prepend(comment);
    };
    addComment.type = "text";
    addComment.className = "newComment";
    addComment.placeholder = "Add your own comment here!";
    comments.className = "commentBox";
    for (let j = 0; j <= commentSection.length; j++) {
        if (id === j && commentSection[j].innerHTML.trim() === '') {
            commentSection[j].appendChild(comments);
            commentSection[j].appendChild(addComment);
        }
        else {
            try {
               commentSection[j].innerHTML = '';
            } catch (e) {
                continue;
            }
        }
    }
}

function sendComment(id, input) {
    const commentJSON = {
        comment: input
    };
    const settings = {
        method: 'POST',
        body: JSON.stringify(commentJSON),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`https://granny-smith-server.herokuapp.com/posts/${id}/comments`, settings)
    .then(response => response.json());
}

function sendEmoji(id, emojiId, counter, button) {
    if (!button.classList.contains('disabled')) {
        const settings = {
            method: 'POST'
        }
        fetch(`https://granny-smith-server.herokuapp.com/posts/${id}/emojis/${emojiId}`, settings)
        counter.textContent = parseInt(counter.innerHTML) + 1;
        button.classList.add('disabled');
    }
    else {
        const settings = {
            method: 'DELETE'
        }
        fetch(`https://granny-smith-server.herokuapp.com/posts/${id}/emojis/${emojiId}`, settings)
        counter.textContent = parseInt(counter.innerHTML) - 1;
        button.classList.remove('disabled');
    }
}

function sendDelete(id, length) {
    if (length > 1) {
        var answer = window.confirm("Are you sure you want to delete this story?");
        if (answer) {
            const settings = {
                method: 'DELETE'
            }
            fetch(`https://granny-smith-server.herokuapp.com/posts/${id}`, settings)
            .then(data => {
                //refresh page after delete
                window.location.href = "./posts.html";
            })
        }
    } else {
        alert("We need to keep at least one post or else there will be nothing to read!");
    }
}

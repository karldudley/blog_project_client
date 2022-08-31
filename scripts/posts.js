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
                postTitle.textContent = post.title;
                postHeader.appendChild(postTitle);
                postCard.appendChild(postHeader);
                const postContent = document.createElement('div');
                postContent.className = 'post-content';
                const postText = document.createElement('p');
                postContent.appendChild(postText);
                postText.textContent = post.content;
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
    console.log(post.comments);
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
            commentSection[j].innerHTML = '';
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
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}



const commentBoxes = document.getElementsByClassName('comments');
const commentSection = document.getElementsByClassName('comments-section');

for (let i = 0; i < commentBoxes.length; i++) {
    commentBoxes[i].addEventListener('click', openComments.bind(this, i));
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

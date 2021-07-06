const commentText = document.querySelector(".comment-text");
const commentButton = document.querySelector(".comment-btn");
const commentsDisplay = document.querySelector(".comments-display");
const commentsArray = [];

class Comment {
    constructor(text,replies){
        this.text =text;
        this.replies = replies;
    }
}


function createComment(parent,text){
    parent ? 
    parent.replies.push(new Comment(text,[]))
    :
    commentsArray.push(new Comment(text,[]));
    showUpdatedComments(commentsArray,commentsDisplay);
}

function showUpdatedComments(commentsArray,parentDiv){
    parentDiv.innerHTML = "";
    commentsArray.forEach(comment => {
        let commentDiv = document.createElement("div");
        let editButton = document.createElement("button")
        editButton.innerHTML = "edit";
        editButton.classList.add("edit-btn");
        let replyButton = document.createElement("button")
        replyButton.innerHTML= "reply";
        editButton.classList.add("reply-btn");
        let commentTextNode = document.createTextNode(comment.text);
        let commentTextArea = document.createElement("p").appendChild(commentTextNode);
        commentDiv.appendChild(commentTextArea);
        commentDiv.appendChild(editButton);
        commentDiv.appendChild(replyButton);
        editButton.addEventListener("click", ()=>{
            let text  = prompt("enter edited comment")
            comment.text = text;
            showUpdatedComments(commentsArray,commentsDisplay);
        })
        
        replyButton.addEventListener("click", ()=>{
            let text  = prompt("enter reply")
            createComment(comment,text);
        })


        //replies
        if(comment.replies){
            let replyDiv = document.createElement("div");
            commentDiv.appendChild(replyDiv);
            showUpdatedComments(comment.replies,replyDiv);
            parentDiv.appendChild(commentDiv);
            parentDiv.style.margin = "10px";
            parentDiv.style.border = "1px solid black";
        }
    })
}

commentButton.addEventListener("click" , () => {
    createComment(null,commentText.value);
    commentText.value="";
})

// edit comment



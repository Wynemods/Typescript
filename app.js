//Project 1: Twitter Clone

//Below are some APIs to use to build atwitter clone. Check the demo for more. 

//USERS 
//https://jsonplaceholder.typicode.com/users 

//POSTS 
//https://jsonplaceholder.typicode.com/posts 
 //OR (https://jsonplaceholder.typicode.com/posts?userId=1) 

//COMMENTS 
//https://jsonplaceholder.typicode.com/comments 
 //OR (https://jsonplaceholder.typicode.com/comments?postId=1) 


//Task 
//Consume the users API and print all users by username on a select box (by default, display user with ID one) 
//On selecting a User Display the post that user has (by default, display user with ID 1) 
//On selecting a Post show all its comments. (by default, display comments for post with ID 1) 

//DEMO  
//https://twitter-signals-7iou.vercel.app/ 



async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}
async function fetchPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.json();
}
async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.json();;
}

let userSelect;

async function populateUsers() {
    const users = await fetchUsers();
    userSelect = document.getElementById('userSelect');
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id.toString();
        option.textContent = user.username;
        userSelect.appendChild(option);
    });


    userSelect.value = '1';

    userSelect.addEventListener('change', async () => {
        await displayPosts(Number(userSelect.value));
    });
  await displayPosts(1);
}

async function displayPosts(userId) {
    const posts = await fetchPosts(userId);
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';

    if (posts.length === 0) {
        postsDiv.textContent = 'No posts available for this user.';
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = '';
        return;
    }

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postElement.style.cursor = 'pointer';
        postElement.addEventListener('click', () => {
            displayComments(post.id);
            highlightSelectedPost(postElement);
        });
        postsDiv.appendChild(postElement);
        if (index === 0) {
            highlightSelectedPost(postElement);
            displayComments(post.id);
        }
    });
}
function highlightSelectedPost(selectedElement) {
    const postsDiv = document.getElementById('posts');
    Array.from(postsDiv.children).forEach(child => {
        child.style.backgroundColor = '';
    });
    selectedElement.style.backgroundColor = '#e0e0e0';
}
async function displayComments(postId) {
    const comments = await fetchComments(postId);
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p><strong>${comment.email}</strong>: ${comment.body}</p>`;
        commentsDiv.appendChild(commentElement);
    });
}

populateUsers();

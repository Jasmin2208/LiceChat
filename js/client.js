const socket = io('http://localhost:7000');

//Get DOM element in respective JS variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const messageContainer = document.querySelector('.container')

//Audio that will play on recieving messages
var audio = new Audio('iphone_sms_original.mp3')


//Function which will append event info to the container
const append = (message, position) => {
 const messageElement = document.createElement('div');
 messageElement.innerText = message;
 messageElement.classList.add('message')
 messageElement.classList.add(position);
 messageContainer.append(messageElement);
 if(position == 'left'){
 audio.play();
}
};

//if the form get submitted, send server to the message
form.addEventListener('submit', (e)=>{
 e.preventDefault();
 const message = messageInput.value;
 append(`you: ${message}`,'right');
 socket.emit('send',message);
 messageInput.value = '';
})


//Ask new user for his/her name and let the server know
const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined',name1);


//If new user join, let receive event from server
socket.on('user-joined', name1 => {
 append(`${name1} join the chat`, 'right')
});

//If server send a message,receive it
socket.on('receive', data => {
 append(`${data.name1}:${data.message}`, 'left')
});


//if the user leaves the chat append the info. to the container
socket.on('left', name1 => {
 append(`${name1} left the chat`, 'left')
});
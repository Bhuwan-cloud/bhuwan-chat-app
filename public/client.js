const socket = io();
let username;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let button = document.querySelector("button");
var audio = new Audio("ting.mp3");

do {
  username = prompt("Please enter your name to join the Chat: ");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    sendMessage(e.target.value);
  }
});

button.addEventListener("click", () => {
  sendMessage(textarea.value);
});

//  what message to be sent
function sendMessage(data) {
  let msg = {
    user: username,
    message: data.trim(),
  };

  // Append message to message area from textarea
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("xevent", msg);
}

//  function to append message to message Area
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
  audio.play();
}

// Recieve messages from server------

socket.on("yevent", (msg) => {
  appendMessage(msg, "incoming");
});

// after pressing enter the pointer will be at current sent message  at bottom........
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

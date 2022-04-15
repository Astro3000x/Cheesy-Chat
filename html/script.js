var devs = ["Astro 3000", "chickenman thegod"];
var shareholder = ["Boy Bearcat"];


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  
  document.getElementById("profileimg").src = profile.getImageUrl();
  
  document.getElementById("profilename").innerHTML = profile.getName();
  document.getElementById("NameInput").value = profile.getName();
  
  
  if (devs.includes(profile.getName())) {
    document.getElementById("devm").innerHTML = "Developer Team";
  }
  if (shareholder.includes(profile.getName())) {
    document.getElementById("devm").innerHTML = "Share Holder Guy";
  }
  
  
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  document.getElementById("profileimg").src = "";
  
  document.getElementById("profilename").innerHTML = "";
  
  

  document.getElementById("devm").innerHTML = ""
  document.getElementById("NameInput").value = "";
}

function copyemojicheese() {

  var copyText = document.getElementById("cheeseemoji");


  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

}
function copyemojiorangecheese() {

  var copyText = document.getElementById("ocheeseemoji");

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);


}



function copyemojihappycheese() {

  var copyText = document.getElementById("happycheeseemoji");

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);


}
function copyemojisadcheese() {

  var copyText = document.getElementById("sadcheeseemoji");

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);


}





var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Server: " + room;
  })

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length < 9){
      messages.push(message);
      
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#ECDC68;";
    }
  })
}

function Connect(){
  socket.emit("join", chatIDInput.value, usernameInput.value);
}

function Send(){
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}
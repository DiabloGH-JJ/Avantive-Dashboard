const nameInput = document.getElementById('inputfield');
const emailInput = document.getElementById('email-address');
const githubInput = document.getElementById('github-username');
const message = document.getElementById('message');
const generateTicket = document.getElementById('generate-ticket');
const uploadImage = document.getElementById('fileinput').uploadimage;
const formData = new FormData();
const signInContainer = document.getElementById('sign-in');
const ticketContainer = document.getElementById('ticketContainer');
const greeting = document.getElementById('greeting');
const userInfo = document.getElementById('userInfo');
const emailMessage = document.getElementById('emailMessage');
const ticketNumber = document.getElementById('ticketNumber');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = userNameInput.value.trim();
const userEmail = userEmailInput.value.trim();

if (userName && userEmail) {
    signInContainer.style.display = 'none';

    const ticketNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');

    ticketContainer.style.display = 'block';
    greeting.textContent = `Congrats, ${userName}!`;
        userInfo.textContent = `${userName} (@${userName.toLowerCase().replace(/\s/g, '')}${ticketNum})`;
        emailMessage.textContent = `We've emailed your ticket to ${userEmail} and will send updates in the run up to the event.`;
        ticketNumber.textContent = `#${ticketNum}`;
      }
});
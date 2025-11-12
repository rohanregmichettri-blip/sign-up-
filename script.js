const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm"); // fixed lowercase
const message = document.getElementById("message");

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// SIGNUP
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("sUsername").value.trim();
    const password = document.getElementById("sPassword").value;
    const email = document.getElementById("sEmail").value.trim();

    if (!username || !password || !email) {
      message.textContent = "Please fill in all required fields";
      message.style.color = "red";
      return;
    }

    const users = getUsers();
    if (
      users.find((user) => user.username === username || user.email === email)
    ) {
      message.textContent = "Username or email already exists";
      message.style.color = "red";
      return;
    }

    users.push({ username, password, email });
    saveUsers(users);

    message.textContent = "Account created successfully";
    message.style.color = "green";
    signupForm.reset();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
}

// LOGIN
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("lUsername").value.trim();
    const password = document.getElementById("lPassword").value;

    const users = getUsers();
    const user = users.find(
      (u) =>
        (u.username === username || u.email === username) &&
        u.password === password
    );

    if (user) {
      message.textContent = `Login Successful — Welcome, ${user.username}!`;
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "landing.html";
      }, 1000);
    } else {
      message.textContent = "Invalid username/email or password";
      message.style.color = "red";
    }
  });
}

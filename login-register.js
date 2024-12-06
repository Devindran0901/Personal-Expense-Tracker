$(document).ready(function () {
    // Handle Registration Form Submission
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();
        const confirmPassword = $("#confirmPassword").val().trim();

        // Validate input
        if (!username || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Retrieve existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the username already exists
        const userExists = existingUsers.some(user => user.username === username);
        if (userExists) {
            alert("Username already exists! Please choose a different username.");
            return;
        }

        // Save the new user
        existingUsers.push({ username, password });
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration successful! Please log in.");

        // Redirect to index page which is log in page
        window.location.href = "index.html";
    });

    // Handle Login Form Submission
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        // Retrieve existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the user exists and the password matches
        const user = existingUsers.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Login successful!");

            // Store the logged-in user's info in local storage
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            // Redirect to main.html
            window.location.href = "main.html";
        } else {
            alert("Invalid username or password! Please try again.");
        }
    });

    
});

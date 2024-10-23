document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple login validation
    if (email && password) {
        // Simulate successful login by saving email in localStorage
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'main.html';  // Redirect to the main.html page
    } else {
        alert('Please enter valid email and password!');
    }
});

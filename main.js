document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
    } else {
        // Display a welcome message
        document.getElementById('welcomeMessage').textContent = `Welcome, ${loggedInUser}`;
    }

    // Load any previously posted assignments from localStorage
    loadAssignments();

    // Handle assignment form submission
    document.getElementById('assignmentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('assignmentTitle').value;
        const amount = document.getElementById('amount').value;
        const fileInput = document.getElementById('assignmentFile');
        const file = fileInput.files[0];

        if (title && amount && file) {
            const assignment = {
                title: title,
                amount: amount,
                postedBy: loggedInUser,
                fileName: file.name,  // Just storing the file name
                bids: []
            };

            let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
            assignments.push(assignment);
            localStorage.setItem('assignments', JSON.stringify(assignments));

            // Clear form
            document.getElementById('assignmentForm').reset();
            loadAssignments();
        } else {
            alert('Please complete all fields');
        }
    });
});

// Function to load assignments and display them
function loadAssignments() {
    const assignmentList = document.getElementById('assignments');
    assignmentList.innerHTML = '';  // Clear previous content

    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    
    assignments.forEach((assignment, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${assignment.title}</strong> (Posted by: ${assignment.postedBy}, Amount: $${assignment.amount}) 
            <br><a href="assests/${assignment.fileName}" download>${assignment.fileName}</a>
            <br>
            <button onclick="bidForAssignment(${index})">Bid for Assignment</button>
            <div id="bids-${index}"></div>
        `;
        assignmentList.appendChild(listItem);

        loadBids(index);
    });
}

// Function to handle bidding
function bidForAssignment(index) {
    const bidAmount = prompt('Enter your bid amount:');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (bidAmount && loggedInUser) {
        let assignments = JSON.parse(localStorage.getItem('assignments'));
        const bid = {
            bidder: loggedInUser,
            amount: bidAmount
        };
        assignments[index].bids.push(bid);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        loadAssignments();
    } else {
        alert('You must enter a bid amount and be logged in!');
    }
}

// Function to display bids for each assignment
function loadBids(index) {
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const bidContainer = document.getElementById(`bids-${index}`);
    bidContainer.innerHTML = '';

    assignments[index].bids.forEach(bid => {
        const bidItem = document.createElement('p');
        bidItem.textContent = `Bid by ${bid.bidder} for $${bid.amount}`;
        bidContainer.appendChild(bidItem);
    });
}

// Function to handle logout
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

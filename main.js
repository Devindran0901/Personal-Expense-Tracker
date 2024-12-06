$(document).ready(function () {
    // Array to store expenses
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Function to update the expenses table
    function updateTable() {
        const tableBody = $("#expenseTableBody");
        tableBody.empty(); // Clear previous table rows

        expenses.forEach((expense, index) => {
            tableBody.append(`
                <tr>
                    <td>${expense.date}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.category}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Add Expense
    $("#expenseForm").on("submit", function (e) {
        e.preventDefault();

        const date = $("#date").val();
        const amount = $("#amount").val();
        const category = $("#category").val();

        if (date && amount && category) {
            expenses.push({ date, amount, category });
            localStorage.setItem("expenses", JSON.stringify(expenses));
            alert("Expense added successfully!");
            $(this)[0].reset(); // Reset form
        } else {
            alert("Please fill out all fields.");
        }

        updateTable();
    });

    // Delete Expense
    window.deleteExpense = function (index) {
        if (confirm("Are you sure you want to delete this expense?")) {
            expenses.splice(index, 1); // Remove the selected expense
            localStorage.setItem("expenses", JSON.stringify(expenses));
            updateTable(); // Update the table after deletion
        }
    };

    // Edit Expense
    window.editExpense = function (index) {
        const expense = expenses[index];
        $("#date").val(expense.date);
        $("#amount").val(expense.amount);
        $("#category").val(expense.category);

        // Update on form submission
        $("#expenseForm").off("submit").on("submit", function (e) {
            e.preventDefault();
            const newDate = $("#date").val();
            const newAmount = $("#amount").val();
            const newCategory = $("#category").val();

            expenses[index] = { date: newDate, amount: newAmount, category: newCategory };
            localStorage.setItem("expenses", JSON.stringify(expenses));
            alert("Expense updated successfully!");

            $(this)[0].reset();
            updateTable();

            // Restore original event listener for Add functionality
            $("#expenseForm").off("submit").on("submit", function (e) {
                e.preventDefault();
                const date = $("#date").val();
                const amount = $("#amount").val();
                const category = $("#category").val();

                expenses.push({ date, amount, category });
                localStorage.setItem("expenses", JSON.stringify(expenses));
                alert("Expense added successfully!");
                $(this)[0].reset();
                updateTable();
            });
        });
    };

    // View Summary
    $("#viewSummaryButton").on("click", function () {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const monthlyExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );
        });

        const total = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        $("#summaryText").text(`Total Expenses For The Current Month: RM ${total.toFixed(2)}`);
    });

    // Handle Logout Button
    $("#logoutButton").on("click", function () {
        // Remove the logged-in user from local storage
        localStorage.removeItem("loggedInUser");
        alert("You have successfully logged out!");

        // Redirect to the index page which is log in page
        window.location.href = "index.html";
    });


    // Initialize the table
    updateTable();
});
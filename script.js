document.addEventListener("DOMContentLoaded", function () {
    loadExpenses();
});

function addExpense() {
    const expenseInput = document.getElementById("expense");
    const amountInput = document.getElementById("amount");

    const expense = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (expense && !isNaN(amount)) {
        const expenseData = {
            id: new Date().getTime(),
            expense,
            amount,
        };

        let expenses = getExpenses();
        expenses.push(expenseData);
        saveExpenses(expenses);
        loadExpenses();

        // Clear input fields
        expenseInput.value = "";
        amountInput.value = "";
    }
}

function loadExpenses() {
    const expensesList = document.getElementById("expenseList");
    expensesList.innerHTML = "";

    const expenses = getExpenses();

    expenses.forEach((expense) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${expense.expense} - $${expense.amount}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            <button onclick="editExpense(${expense.id})">Edit</button>
        `;
        expensesList.appendChild(listItem);
    });
}

function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter((expense) => expense.id !== id);
    saveExpenses(expenses);
    loadExpenses();
}

function editExpense(id) {
    let expenses = getExpenses();
    const expenseToEdit = expenses.find((expense) => expense.id === id);

    const expenseInput = document.getElementById("expense");
    const amountInput = document.getElementById("amount");

    expenseInput.value = expenseToEdit.expense;
    amountInput.value = expenseToEdit.amount;

    deleteExpense(id); // Remove the original entry
}

function getExpenses() {
    const expensesString = localStorage.getItem("expenses");
    return expensesString ? JSON.parse(expensesString) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}



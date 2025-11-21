const BASE_URL = "https://expense-backend-copy.onrender.com"; // change this

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");

// Load expenses on page load
document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses() {
    list.innerHTML = "Loading...";

    const res = await fetch(`${BASE_URL}/expenses`);
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.title}</span>
            <strong>₹${item.amount}</strong>
        `;
        list.appendChild(li);
    });
}

// Add new expense
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    const res = await fetch(`${BASE_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: parseFloat(amount) })
    });

    if (res.ok) {
        form.reset();
        loadExpenses();
    } else {
        alert("Failed to add expense");
    }
});

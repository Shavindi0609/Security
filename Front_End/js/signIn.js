document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // "OK"
            // Save token/data if returned: data.data
            window.location.href = "dashboard.html"; // or your home page
        } else {
            alert("Login failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});

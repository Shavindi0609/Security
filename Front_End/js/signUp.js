document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();

    try {
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // "User Registered Successfully"
            window.location.href = "signIn.html";
        } else {
            alert("Signup failed");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});

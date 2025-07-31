document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", function (e) {
        // Trim input values
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        // Email check
        if (!emailValue || !validateEmail(emailValue)) {
            e.preventDefault();
            alert("Please enter a valid email address.");
            email.focus();
            return;
        }

        // Password check
        if (passwordValue.length < 6) {
            e.preventDefault();
            alert("Password must be at least 6 characters long.");
            password.focus();
            return;
        }
    });

    // Email validation function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

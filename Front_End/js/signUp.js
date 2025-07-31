document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    form.addEventListener("submit", function (e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault(); // Stop form submission
            alert("Passwords do not match. Please try again.");
            confirmPassword.focus();
        }

        // You can add more validations if needed, e.g., password strength, etc.
    });
});

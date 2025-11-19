function validate() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    let valid = true;

    nameErr.innerText = "";
    emailErr.innerText = "";
    passErr.innerText = "";
    confirmErr.innerText = "";


    if (name === "") {
        nameErr.innerText = "Name is required";
        valid = false;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        emailErr.innerText = "Email is required";
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailErr.innerText = "Invalid email format";
        valid = false;
    }

    if (pass === "") {
        passErr.innerText = "Password is required";
        valid = false;
    } else if (pass.length < 6) {
        passErr.innerText = "Minimum 6 characters";
        valid = false;
    }

    if (confirm === "") {
        confirmErr.innerText = "Confirm your password";
        valid = false;
    } else if (pass !== confirm) {
        confirmErr.innerText = "Passwords do not match";
        valid = false;
    }

    if (valid) {
        alert("Registration Successful!");
    }
}
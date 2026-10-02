function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!]).+$/.test(value);
}

if (typeof document !== "undefined") {
    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");
    const passwordFeedback = document.getElementById("passwordFeedback");

    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    function setError(input, errorElement, message) {
        errorElement.textContent = message;
        input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function checkFullName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            setError(fullName, fullNameError, "Enter your full name.");
            return false;
        }

        setError(fullName, fullNameError, "");
        return true;
    }

    function checkStudentNumber() {
        studentNumber.value = studentNumber.value.trim();

        if (!isValidStudentNumber(studentNumber.value)) {
            setError(studentNumber, studentNumberError,
                "Enter a student number in the format 24-1234-123.");
            return false;
        }

        setError(studentNumber, studentNumberError, "");
        return true;
    }

    function checkEmail() {
        email.value = email.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {
            setError(email, emailError, "Enter a valid email address.");
            return false;
        }

        setError(email, emailError, "");
        return true;
    }

    function checkMobile() {
        mobileNumber.value = mobileNumber.value.trim();

        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(mobileNumber.value)) {
            setError(mobileNumber, mobileNumberError,
                "Enter 09 followed by 9 digits or +639 followed by 9 digits.");
            return false;
        }

        setError(mobileNumber, mobileNumberError, "");
        return true;
    }

    function checkPassword() {
        if (!isValidPassword(password.value)) {
            setError(password, passwordError,
                "Password must have 8 characters, one uppercase letter, one digit, and @, $, or !.");
            return false;
        }

        setError(password, passwordError, "");
        return true;
    }

    function updatePasswordFeedback() {
        if (password.value === "") {
            passwordFeedback.textContent = "";
        } else if (isValidPassword(password.value)) {
            passwordFeedback.textContent = "Password meets the requirements.";
        } else {
            passwordFeedback.textContent =
                "Password needs 8 characters, uppercase, number, and @, $, or !.";
        }
    }

    function checkConfirmPassword() {
        if (confirmPassword.value === "" || confirmPassword.value !== password.value) {
            setError(confirmPassword, confirmPasswordError, "Passwords do not match.");
            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");
        return true;
    }

    function checkCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(course, courseError, "Please select BSIT or BSCS.");
            return false;
        }

        setError(course, courseError, "");
        return true;
    }

    function checkTerms() {
        if (!terms.checked) {
            termsError.textContent = "You must agree to the terms.";
            terms.setAttribute("aria-invalid", "true");
            return false;
        }

        termsError.textContent = "";
        terms.setAttribute("aria-invalid", "false");
        return true;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const validName = checkFullName();
        const validStudentNumber = checkStudentNumber();
        const validEmail = checkEmail();
        const validMobile = checkMobile();
        const validPassword = checkPassword();
        const validConfirm = checkConfirmPassword();
        const validCourse = checkCourse();
        const validTerms = checkTerms();

        if (
            validName &&
            validStudentNumber &&
            validEmail &&
            validMobile &&
            validPassword &&
            validConfirm &&
            validCourse &&
            validTerms
        ) {
            successMessage.textContent = "Registration details validated successfully!";

            document.getElementById("summaryName").textContent = fullName.value.trim();
            document.getElementById("summaryStudentNumber").textContent = studentNumber.value.trim();
            document.getElementById("summaryEmail").textContent = email.value.trim();
            document.getElementById("summaryMobileNumber").textContent = mobileNumber.value.trim();
            document.getElementById("summaryCourse").textContent = course.value;

            registrationSummary.hidden = false;
        } else {
            successMessage.textContent = "";
            registrationSummary.hidden = true;
        }
    });

    password.addEventListener("input", function() {
        updatePasswordFeedback();
        if (password.value !== "") {
            checkPassword();
        }
    });

    confirmPassword.addEventListener("input", function() {
        if (confirmPassword.value !== "") {
            checkConfirmPassword();
        }
    });

    fullName.addEventListener("blur", checkFullName);

    course.addEventListener("change", checkCourse);
    terms.addEventListener("change", checkTerms);

    form.addEventListener("reset", function() {
        setTimeout(function() {
            fullNameError.textContent = "";
            studentNumberError.textContent = "";
            emailError.textContent = "";
            mobileNumberError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            courseError.textContent = "";
            termsError.textContent = "";
            passwordFeedback.textContent = "";
            successMessage.textContent = "";
            registrationSummary.hidden = true;

            document.querySelectorAll("#registrationForm input, #registrationForm select")
                .forEach(function(element) {
                    element.setAttribute("aria-invalid", "false");
                });
        }, 0);
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

// Common Email Validation
const validateEmail = (email) => {
    if (!email) {
        return "Email is required.";
    } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        return "Email address is invalid.";
    }
    return "";
};

// Validation for Login
export const validateLogin = (email, password) => {
    const errors = {};

  
    const emailError = validateEmail(email);
    if (emailError) {
        errors.email = emailError;
    }


    if (!password) {
        errors.password = "Password is required.";
    }

    return errors;
};

// Validation for Signup
export const validateSignup = (email, password, confirmPassword) => {
    const errors = {};

   
    const emailError = validateEmail(email);
    if (emailError) {
        errors.email = emailError;
    }

   
    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

   
    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

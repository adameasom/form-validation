import React, { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)
	const [formMessage, setFormMessage] = useState("");

  const validateUsername = (username) => {
    if (!username) return ""; // No error if the field is empty
		const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allows letters, numbers, and underscores
    if (username.length < 3) {
      return "Username must be at least 3 characters.";
    }
    if (!usernameRegex.test(username)) {
			return "Username can only contain letters and numbers.";
		}
    return ""; // Valid username
	};

  const validateEmail = (email) => {
    if (!email) return ""; // No error if the field is empty
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid email format.";
  };

  const validatePassword = (password) => {
    if (!password) return ""; // No error if the field is empty
		if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
    if (!passwordRegex.test(password)) {
      return "Password must include an uppercase letter and a number.";
    }
  
    return ""; // Valid password
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "username":
        setErrors({ ...errors, username: validateUsername(value) });
        break;
      case "email":
        setErrors({ ...errors, email: validateEmail(value) });
        break;
      case "password":
        setErrors({ ...errors, password: validatePassword(value) });
        break;
      default:
        break;
    }
		if (formMessage) {
      setFormMessage(""); // Reset message when user types
    }
  };

	// Function to determine input box styles based on errors
  const getInputStyle = (field) => {
    if (errors[field]) {
      return { border: "1px solid red" }; // Red border for errors
    } else if (formData[field]) {
      return { border: "1px solid green" }; // Green border if valid
    }
    return {}; // Default no border
  };
  
  const isFormValid =
    !Object.values(errors).some((err) => err) &&
    Object.values(formData).every((field) => field);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormValid) {
        setFormMessage("You've signed up successfully!");
        console.log("User Data:", formData);
      } else {
        setFormMessage("Please fix the errors before submitting.");
      }
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    };

  return (
		<>
			<form onSubmit={handleSubmit} className="form">
				<h2>Join!</h2>
				<div>
					<label>Username:</label>
					<input
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Enter your username"
						style={getInputStyle("username")}
					/>
					<p className="error">{errors.username}</p>
				</div>

				<div>
					<label>Email:</label>
					<input
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Enter your email"
						style={getInputStyle("email")}
					/>
					<p className="error">{errors.email}</p>
				</div>

				<div className="password-container">
					<label>Password:</label>
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Enter your password"
						style={getInputStyle("password")}
					/>
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "relative",
              left: "92%",
              top: "-26px",
              cursor: "pointer",
              color: "#888",
            }}
          >
            {showPassword ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }
          </span>
					<p className="error">{errors.password}</p>
				</div>

				<button type="submit" disabled={!isFormValid}>Sign Up</button>
			</form>
			{formMessage && <p style={{ textAlign: "center", marginTop: "30px", color: formMessage.includes("successfully") ? "green" : "red" }}>{formMessage}</p>}
		</>
  );
};

export default SignUpForm;

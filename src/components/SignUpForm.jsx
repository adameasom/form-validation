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
          <div className="show-password">
            <label for="showpassword">Show Password?</label>
            <input
              type="checkbox"
              name="showpassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
					<p className="error">{errors.password}</p>
				</div>

        

				<button type="submit" disabled={!isFormValid}>Sign Up</button>
			</form>
			{formMessage && <p style={{ textAlign: "center", marginTop: "30px", animation: "fadeAway 10s forwards", color: formMessage.includes("successfully") ? "green" : "red" }}>{formMessage}</p>}
		</>
  );
};

export default SignUpForm;

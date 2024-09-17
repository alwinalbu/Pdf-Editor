import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { commonRequest } from "../../utlis/commonRequest";
import { useNavigate } from "react-router-dom";

const UserSignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,}$/; 
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validateUsername(username)) {
      setError(
        "Username must be at least 3 characters long and contain only letters, numbers, and underscores."
      );
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one letter and one number."
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await commonRequest("POST", "/signup", {
        email,
        username,
        password,
      });

      if (response) {
        localStorage.setItem("userInfo", JSON.stringify(response));
        navigate("/home");
      }
    } catch (error) {
      setError("An error occurred during signup. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 sm:p-8">
      <div className="p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            fullWidth
            clearable
            bordered
            label="Username"
            placeholder="Choose a username"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            fullWidth
            clearable
            bordered
            label="Email"
            placeholder="Enter your email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            fullWidth
            clearable
            bordered
            type="password"
            label="Password"
            placeholder="Enter your password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            fullWidth
            clearable
            bordered
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            className="mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <Button
            color="gradient"
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            auto
            type="submit"
            isLoading={loading}
          >
            Sign Up
          </Button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignUpPage;

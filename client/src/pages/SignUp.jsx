import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    hobbies: "",
    photoUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      const hobbiesArray = formData.hobbies
        .split(",")
        .map((hobby) => hobby.trim())
        .filter(Boolean);

      await api.post("/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        bio: formData.bio,
        hobbies: hobbiesArray,
        photoUrl: formData.photoUrl,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>

        <div>
          <label htmlFor="hobbies">Hobbies</label>
          <input
            id="hobbies"
            name="hobbies"
            type="text"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="painting, football, cooking"
          />
        </div>

        <div>
          <label htmlFor="photoUrl">Photo URL</label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="text"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
};

export default SignUp;

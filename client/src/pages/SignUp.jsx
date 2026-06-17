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
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <section className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-2">
            <h1 className="card-title text-2xl">Create Account</h1>
            <p className="text-sm text-base-content/70">
              Join HobbyHub and start sharing what you love.
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Manthan"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Raut"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Use a strong password"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Bio</span>
              </div>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell people what you enjoy"
                className="textarea textarea-bordered min-h-24 w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Hobbies</span>
              </div>
              <input
                name="hobbies"
                type="text"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="painting, football, cooking"
                className="input input-bordered w-full"
              />
              <div className="label">
                <span className="label-text-alt">
                  Separate hobbies with commas.
                </span>
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                name="photoUrl"
                type="text"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;

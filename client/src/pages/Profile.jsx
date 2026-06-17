import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    hobbies: "",
    photoUrl: "",
  });
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [passwordMessage, setPasswordMessage] = useState("");

  const fetchProfile = async () => {
    try {
      setError("");
      setLoading(true);

      const response = await api.get("/profile");
      const profile = response.data.data;
      setUser(profile);

      setEditData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
        hobbies: profile.hobbies?.join(", ") || "",
        photoUrl: profile.photoUrl || "",
      });
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load profile");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const hobbiesArray = editData.hobbies
        .split(",")
        .map((hobby) => hobby.trim())
        .filter(Boolean);

      const response = await api.patch("/profile/edit", {
        firstName: editData.firstName,
        lastName: editData.lastName,
        bio: editData.bio,
        hobbies: hobbiesArray,
        photoUrl: editData.photoUrl,
      });

      setUser(response.data.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Logout failed");
    }
  };

  const handleChangePassword = async (event) => {
  event.preventDefault();

  try {
    setError("");

    await api.patch("/profile/password", {
      oldPassword,
      newPassword,
    });

    setOldPassword("");
    setNewPassword("");
    setPasswordMessage("Password updated successfully");
  } catch (error) {
    setError(error.response?.data?.error || "Failed to update password");
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Profile</h1>

      <section>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Bio:</strong> {user.bio || "No bio added yet"}
        </p>

        <p>
          <strong>Hobbies:</strong>{" "}
          {user.hobbies?.length
            ? user.hobbies.join(", ")
            : "No hobbies added yet"}
        </p>

        {user.photoUrl && (
          <img src={user.photoUrl} alt={user.firstName} width="160" />
        )}
      </section>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>

      <h2>Edit Profile</h2>

      <form onSubmit={handleEditProfile}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={editData.firstName}
            onChange={handleEditChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={editData.lastName}
            onChange={handleEditChange}
          />
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={editData.bio}
            onChange={handleEditChange}
          />
        </div>

        <div>
          <label htmlFor="hobbies">Hobbies</label>
          <input
            id="hobbies"
            name="hobbies"
            type="text"
            value={editData.hobbies}
            onChange={handleEditChange}
            placeholder="painting, football, cooking"
          />
        </div>

        <div>
          <label htmlFor="photoUrl">Photo URL</label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="text"
            value={editData.photoUrl}
            onChange={handleEditChange}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>

      <h2>Change Password</h2>

<form onSubmit={handleChangePassword}>
  <div>
    <label htmlFor="oldPassword">Old password</label>
    <input
      id="oldPassword"
      type="password"
      value={oldPassword}
      onChange={(event) => setOldPassword(event.target.value)}
    />
  </div>

  <div>
    <label htmlFor="newPassword">New password</label>
    <input
      id="newPassword"
      type="password"
      value={newPassword}
      onChange={(event) => setNewPassword(event.target.value)}
    />
  </div>

  <button type="submit">Update Password</button>
</form>

{passwordMessage && <p>{passwordMessage}</p>}
    </main>
  );
}

export default Profile;

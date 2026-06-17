import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileError, setProfileError] = useState("");
  const [editError, setEditError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    hobbies: "",
    photoUrl: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const syncEditForm = (profile) => {
    setEditData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      bio: profile.bio || "",
      hobbies: profile.hobbies?.join(", ") || "",
      photoUrl: profile.photoUrl || "",
    });
  };

  const fetchProfile = async () => {
    try {
      setProfileError("");
      setLoading(true);

      const response = await api.get("/profile");
      const profile = response.data.data;

      setUser(profile);
      syncEditForm(profile);
    } catch (error) {
      setProfileError(error.response?.data?.error || "Failed to load profile");
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

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();

    try {
      setEditError("");

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

      const updatedUser = response.data.data;

      setUser(updatedUser);
      syncEditForm(updatedUser);
    } catch (error) {
      setEditError(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      setPasswordError("");
      setPasswordMessage("");

      await api.patch("/profile/password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

      setPasswordMessage("Password updated successfully");
    } catch (error) {
      setPasswordMessage("");
      setPasswordError(
        error.response?.data?.error || "Failed to update password",
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="alert alert-error">
        <span>{profileError}</span>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[260px_1fr]">
      <section className="card bg-base-100 shadow">
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <div className="avatar placeholder">
            <div className="h-20 w-20 rounded-full bg-primary text-primary-content">
              {user.photoUrl ? (
                <img src={user.photoUrl} alt={user.firstName} />
              ) : (
                <span className="text-2xl">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold leading-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="break-all text-xs text-base-content/60">
              {user.email}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-base-content/80">
            {user.bio || "No bio added yet."}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5">
            {user.hobbies?.length ? (
              user.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="badge badge-sm badge-primary badge-outline"
                >
                  {hobby}
                </span>
              ))
            ) : (
              <span className="badge badge-sm badge-ghost">No hobbies yet</span>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6">
        <section className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>

            {editError && (
              <div className="alert alert-error text-sm">
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditProfile} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">First name</span>
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    value={editData.firstName}
                    onChange={handleEditChange}
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
                    value={editData.lastName}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Bio</span>
                </div>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleEditChange}
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
                  value={editData.hobbies}
                  onChange={handleEditChange}
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
                  value={editData.photoUrl}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>

              <button type="submit" className="btn btn-primary">
                Save Profile
              </button>
            </form>
          </div>
        </section>

        <section className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Change Password</h2>

            {passwordMessage && (
              <div className="alert alert-success text-sm">
                <span>{passwordMessage}</span>
              </div>
            )}

            {passwordError && (
              <div className="alert alert-error text-sm">
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="grid gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Old password</span>
                </div>
                <input
                  name="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">New password</span>
                </div>
                <input
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                />
                <div className="label">
                  <span className="label-text-alt">
                    Use a strong password like NewPassword@123.
                  </span>
                </div>
              </label>

              <button type="submit" className="btn btn-secondary">
                Update Password
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;

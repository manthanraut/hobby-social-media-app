import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.error || "Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
      <div className="flex-1">
        <Link to="/profile" className="text-xl font-bold">
          HobbyHub
        </Link>
      </div>

      <div className="flex-none gap-2">
        <Link to="/profile" className="btn btn-ghost">
          Profile
        </Link>

        <button type="button" className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
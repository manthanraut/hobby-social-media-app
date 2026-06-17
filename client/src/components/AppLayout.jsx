import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">MiniEvent</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {isLoggedIn() ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            
          </>
        )}
      </div>
    </nav>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 w-96 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Signup
        </button>
        <p className="text-center mt-4">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

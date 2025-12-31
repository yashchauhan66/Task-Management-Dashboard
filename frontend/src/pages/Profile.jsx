import { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  
  const updateProfile = async () => {
    try {
      await API.put("/profile/me", { name });
      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <label className="block mb-2 font-semibold">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <p className="mb-4">
          <b>Email:</b> {user.email}
        </p>

        <button
          onClick={updateProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

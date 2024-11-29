import axios from "axios";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch the list of users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle user role between 'customer' and 'admin'
  const toggleUserRole = async (userId) => {
    try {
      await axios.put(
        `${apiUrl}/api/toggle-role/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("User role updated successfully");
      fetchUsers(); // Refresh the user list after role update
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8 mt-8">Users List</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.firstName}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">
                      {/* Toggle role button */}
                      <button
                        onClick={() => toggleUserRole(user._id)}
                        className={`${
                          user.role === "customer"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white font-bold py-1 px-4 rounded`}
                      >
                        {user.role === "customer"
                          ? "Promote to Admin"
                          : "Demote to Customer"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;

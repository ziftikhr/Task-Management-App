import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';

const AdminPanel = () => {
  const authState = useSelector(state => state.authReducer);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchData, { loading }] = useFetch();

  useEffect(() => {
    const config = { url: "/users", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setUsers(data.users));
  }, [fetchData, authState.token]);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const config = {
      url: `/users/${selectedUser._id}`,
      method: "put",
      headers: { Authorization: authState.token },
      data: selectedUser,
    };
    fetchData(config).then(() => {
      setUsers(users.map(u => (u._id === selectedUser._id ? selectedUser : u)));
      setSelectedUser(null);
    });
  };

  return (
    <div className="my-6 mx-auto max-w-[700px]">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Manage Users</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 shadow-md rounded-md">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="text-center border-t">
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={selectedUser.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </label>

            <div className="flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setSelectedUser(null)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

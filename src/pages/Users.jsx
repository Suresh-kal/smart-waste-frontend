import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Users() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await api.get("/users");

            setUsers(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            await api.post("/users", form);

            toast.success("Operator created successfully.");

            setForm({
                name: "",
                email: "",
                password: ""
            });

            fetchUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create operator."
            );
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.patch(`/users/${id}`);

            toast.success("User status updated.");

            fetchUsers();
        } catch (error) {
            toast.error("Failed to update user.");
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/users/${id}`);

            toast.success("User deleted.");

            fetchUsers();
        } catch (error) {
            toast.error("Delete failed.");
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

            <Navbar />

            <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 mt-6">

                <h1 className="text-2xl sm:text-3xl font-bold">
                    User Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Create and manage operator accounts.
                </p>

                {/* Statistics */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <div className="bg-blue-50 rounded-xl p-5">

                        <p className="text-gray-500">
                            Total Users
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {users.length}
                        </h2>

                    </div>

                    <div className="bg-purple-50 rounded-xl p-5">

                        <p className="text-gray-500">
                            Admins
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {
                                users.filter(
                                    u => u.role === "admin"
                                ).length
                            }
                        </h2>

                    </div>

                    <div className="bg-green-50 rounded-xl p-5">

                        <p className="text-gray-500">
                            Operators
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {
                                users.filter(
                                    u => u.role === "operator"
                                ).length
                            }
                        </h2>

                    </div>

                    <div className="bg-yellow-50 rounded-xl p-5">

                        <p className="text-gray-500">
                            Active
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {
                                users.filter(
                                    u => u.isActive
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                {/* Create Operator */}

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Operator Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
                >
                    + Create Operator
                </button>

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full border rounded-lg px-4 py-3 mt-10"
                />

                {/* Table */}

                <div className="mt-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Users
                    </h2>

                    {loading ? (

                        <p className="text-center py-8">
                            Loading...
                        </p>

                    ) : filteredUsers.length === 0 ? (

                        <div className="bg-slate-50 rounded-xl text-center py-10 text-gray-500">

                            <h2 className="text-2xl font-semibold">
                                No Users Found
                            </h2>

                        </div>

                    ) : (

                        <div className="overflow-x-auto rounded-xl border">
    <table className="min-w-[700px] w-full">

                            <thead>

                                <tr className="bg-slate-100">

                                    <th className="text-left p-4">
                                        Name
                                    </th>

                                    <th className="text-left p-4">
                                        Email
                                    </th>

                                    <th className="text-left p-4">
                                        Role
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>

                                    <th className="text-center p-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredUsers.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="p-4">
                                            {user.name}
                                        </td>

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                                    user.role === "admin"
                                                        ? "bg-purple-600"
                                                        : "bg-blue-600"
                                                }`}
                                            >
                                                {user.role.toUpperCase()}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                                    user.isActive
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {user.isActive
                                                    ? "Active"
                                                    : "Disabled"}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {user.role !== "admin" &&
                                                user._id !== currentUser?.id && (

                                                    <div className="flex flex-col lg:flex-row justify-center gap-2">

                                                        <button
                                                            onClick={() =>
                                                                toggleStatus(
                                                                    user._id
                                                                )
                                                            }
                                                            className={`px-3 py-2 text-sm rounded-lg text-white ${
                                                                user.isActive
                                                                    ? "bg-orange-500 hover:bg-orange-600"
                                                                    : "bg-green-600 hover:bg-green-700"
                                                            }`}
                                                        >
                                                            {user.isActive
                                                                ? "Disable"
                                                                : "Enable"}
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user._id
                                                                )
                                                            }
                                                            className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>
                    </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Users;
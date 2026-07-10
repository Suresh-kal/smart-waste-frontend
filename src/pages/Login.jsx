import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Welcome back!");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center">

            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-green-700">
                        ♻ Smart Waste
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Smart Waste Monitoring System
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="admin@smartwaste.com"
                            className="w-full border rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full border rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                            loading
                                ? "bg-gray-500"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >

                        {loading ? (

                            "Logging in..."

                        ) : (

                            <span className="flex justify-center items-center gap-2">

                                <FaSignInAlt />

                                Login

                            </span>

                        )}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;
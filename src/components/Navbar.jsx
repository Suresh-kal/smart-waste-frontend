import {
    FaRecycle,
    FaSignOutAlt,
    FaUserCircle,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (
<nav className="relative bg-white shadow-md rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center">            {/* Logo */}
           <div className="flex items-center gap-3">

    <FaRecycle className="text-green-600 text-2xl sm:text-2xl sm:text-3xl flex-shrink-0" />

    <div>

        {/* Desktop */}
        <h1 className="hidden sm:block text-2xl font-bold text-slate-800">
            Smart Waste Monitoring
        </h1>

        {/* Mobile */}
        <h1 className="block sm:hidden text-xl font-bold text-slate-800">
            Smart Waste
        </h1>

        <p className="hidden sm:block text-sm text-slate-500">
            AI Powered Dashboard
        </p>

    </div>

</div>

            {/* Navigation */}
{/* Desktop Navigation */}
<div className="hidden lg:flex items-center gap-8">
                <div className="flex gap-6 text-lg">

                    <Link
                        to="/"
                        className="hover:text-green-600 font-medium"
                    >
                        Dashboard
                    </Link>

{isAdmin && (
    <>
        <Link
            to="/register"
            className="hover:text-green-600 font-medium"
        >
            Register Bin
        </Link>

        <Link
            to="/manage"
            className="hover:text-green-600 font-medium"
        >
            Manage Bins
        </Link>

        <Link
            to="/users"
            className="hover:text-green-600 font-medium"
        >
            Users
        </Link>
    </>
)}

                </div>

                {/* User Section */}
                <div className="flex items-center gap-4 border-l pl-6">

                    <FaUserCircle className="text-2xl sm:text-3xl text-green-600" />

                    <div>

                        <p className="font-semibold">
                            {user?.name}
                        </p>

                        <span
                            className={`text-xs px-2 py-1 rounded-full text-white ${
                                user?.role === "admin"
                                    ? "bg-green-600"
                                    : "bg-blue-600"
                            }`}
                        >
                            {user?.role?.toUpperCase()}
                        </span>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </div>
{/* Mobile Menu Button */}

<button
    onClick={() => setMenuOpen(!menuOpen)}
    className="lg:hidden text-2xl text-green-600"
>
    {menuOpen ? <FaTimes /> : <FaBars />}
</button>
{menuOpen && (

    <div className="absolute top-24 left-5 right-5 bg-white rounded-2xl shadow-xl p-6 lg:hidden z-50">

        <div className="flex flex-col gap-5 text-lg">

            <Link to="/" onClick={() => setMenuOpen(false)}>
                Dashboard
            </Link>

            {isAdmin && (
                <>
                    <Link
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                    >
                        Register Bin
                    </Link>

                    <Link
                        to="/manage"
                        onClick={() => setMenuOpen(false)}
                    >
                        Manage Bins
                    </Link>

                    <Link
                        to="/users"
                        onClick={() => setMenuOpen(false)}
                    >
                        Users
                    </Link>
                </>
            )}

            <hr />

            <div className="flex items-center gap-3">

                <FaUserCircle className="text-2xl sm:text-3xl text-green-600" />

                <div>

                    <p className="font-semibold">
                        {user?.name}
                    </p>

                    <span
                        className={`text-xs px-2 py-1 rounded-full text-white ${
                            user?.role === "admin"
                                ? "bg-green-600"
                                : "bg-blue-600"
                        }`}
                    >
                        {user?.role?.toUpperCase()}
                    </span>

                </div>

            </div>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-3"
            >
                Logout
            </button>

        </div>

    </div>

)}
        </nav>
    );
}

export default Navbar;
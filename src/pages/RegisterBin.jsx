import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import LocationPicker from "../components/LocationPicker";
import api from "../services/api";

function RegisterBin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        binId: "",
        location: "",
        latitude: "",
        longitude: ""
    });

    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (position) {
            setForm((prev) => ({
                ...prev,
                latitude: position.lat,
                longitude: position.lng
            }));
        }
    }, [position]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.binId ||
            !form.location ||
            !form.latitude ||
            !form.longitude
        ) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/bins", {
                binId: form.binId,
                location: form.location,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude)
            });

            toast.success("Bin registered successfully!");

            setForm({
                binId: "",
                location: "",
                latitude: "",
                longitude: ""
            });

            setPosition(null);

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to register bin."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

            <Navbar />

            <div className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl shadow-xl p-5 sm:p-8">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Register New Waste Bin
                </h1>

                <p className="text-gray-500 mt-2 mb-8">
                    Enter the waste bin information and select its location on the map.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Bin ID */}

                    <div className="mb-5">

                        <label className="block font-medium mb-2">
                            Bin ID
                        </label>

                        <input
                            type="text"
                            name="binId"
                            value={form.binId}
                            onChange={handleChange}
                            placeholder="BIN003"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                    </div>

                    {/* Location */}

                    <div className="mb-5">

                        <label className="block font-medium mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Engineering Block"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                        />

                    </div>

                    

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block font-medium mb-2">
                                Latitude
                            </label>

                            <input
                                type="number"
                                value={form.latitude}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-slate-100 text-slate-600 cursor-not-allowed"
                            />

                        </div>

                        <div>

                            <label className="block font-medium mb-2">
                                Longitude
                            </label>

                            <input
                                type="number"
                                value={form.longitude}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-slate-100 text-slate-600 cursor-not-allowed"
                            />

                        </div>

                    </div>

                    {/* Map */}

                    <p className="text-sm text-slate-500 mt-8 mb-3">
                        📍 Click anywhere on the map to place the waste bin. The coordinates will be filled automatically.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-6 items-start">

                       

                        <div className="lg:col-span-2">

                            <LocationPicker
                                position={position}
                                setPosition={setPosition}
                            />

                        </div>

                        

                        <div className="order-first lg:order-last">

                            <div className="rounded-2xl border border-green-200 bg-green-50 shadow-sm p-6">

                                <h2 className="text-xl font-bold text-green-700 mb-5">
                                    📍 Selected Location
                                </h2>

                                {position ? (

                                    <>

                                        <div className="mb-4">

                                            <p className="text-sm text-gray-500">
                                                Latitude
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {position.lat.toFixed(6)}
                                            </p>

                                        </div>

                                        <div className="mb-4">

                                            <p className="text-sm text-gray-500">
                                                Longitude
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {position.lng.toFixed(6)}
                                            </p>

                                        </div>

                                        <div className="mt-6 rounded-lg bg-green-600 text-white py-3 text-center font-semibold">

                                            ✅ Ready to Register

                                        </div>

                                    </>

                                ) : (

                                    <div className="text-gray-500">

                                        <p className="font-medium">
                                            Waiting for location...
                                        </p>

                                        <p className="text-sm mt-2">
                                            Select a point on the map to automatically fill the latitude and longitude.
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                   

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-8 py-3 sm:py-3.5 rounded-lg text-white font-semibold transition ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {loading ? <div className="flex justify-center items-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    Registering...
</div> : "Register Bin"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default RegisterBin;
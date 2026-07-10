import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function EditBinModal({
    bin,
    isOpen,
    onClose,
    onSuccess
}) {
    const [form, setForm] = useState({
        location: "",
        latitude: "",
        longitude: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bin) {
            setForm({
                location: bin.location,
                latitude: bin.latitude,
                longitude: bin.longitude
            });
        }
    }, [bin]);

    if (!isOpen || !bin) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            await api.patch(`/bins/${bin.binId}`, {
                location: form.location,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude)
            });

            toast.success("Bin updated successfully.");

            onSuccess();

            onClose();

        } catch (err) {

            console.error(err);

            toast.error("Update failed.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8">

                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                    ✏ Edit Waste Bin
                </h2>
                <p className="text-gray-500 mb-6">
    Update the waste bin information and save your changes.
</p>
                <div className="space-y-5">

                    <div>

                        <label className="font-medium">
                            Bin ID
                        </label>

                        <input
                            value={bin.binId}
                            disabled
                            className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Location
                        </label>

                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="font-medium">
                                Latitude
                            </label>

                            <input
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        <div>

                            <label className="font-medium">
                                Longitude
                            </label>

                            <input
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                    </div>

                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? (
    <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Saving...
    </div>
) : (
    "Save Changes"
)}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditBinModal;
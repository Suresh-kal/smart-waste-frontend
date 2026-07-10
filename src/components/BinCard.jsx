import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {
    FaMapMarkerAlt,
    FaRobot,
    FaClock
} from "react-icons/fa";

function BinCard({ bin, refreshDashboard }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const statusColor = {
        "EMPTY": "bg-green-500",
        "HALF-FULL": "bg-yellow-400",
        "FULL": "bg-orange-500",
        "OVERFLOWING": "bg-red-600"
    };
    const handleAnalyze = async () => {

        if (!selectedFile) return;

        setLoading(true);

        try {

            const formData = new FormData();
            formData.append("image", selectedFile);

            await api.post(
                `/bins/${bin.binId}/analyze`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            await refreshDashboard();
            setSelectedFile(null);
            setPreview(null);

            // ✅ Success toast
            toast.success("Analysis completed successfully!");

        } catch (error) {

            console.error(error);

            // ❌ Error toast
            toast.error("Analysis failed!");

        } finally {

            setLoading(false);

        }
    };
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    <div
        className={`h-2 ${
            statusColor[bin.status]
        }`}
    ></div>

    <div className="p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                <h2 className="text-lg sm:text-xl font-bold break-all">
                    {bin.binId}
                </h2>

                <span
                    className={`self-start sm:self-auto text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${statusColor[bin.status]}`}
                >
                    {bin.status}
                </span>

            </div>

            <p className="text-gray-500 mt-3 flex items-start gap-2 break-words">
                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                {bin.location}
            </p>

            <div className="mt-5">

                <div className="flex justify-between items-center">

    <p className="font-semibold">
        Fill Level
    </p>

    <span className="text-sm font-bold text-slate-600">
        {bin.fillPercentage}%
    </span>

</div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

                    <div
    className={`${statusColor[bin.status]} h-4 rounded-full transition-all duration-700`}
    style={{
        width: `${bin.fillPercentage}%`
    }}
/>

                </div>

                

            </div>

            <div className="mt-5">

                <div className="flex justify-between items-center">

    <p className="flex items-center">
        <FaRobot className="inline mr-2 text-blue-500" />
        AI Confidence
    </p>

    <span className="font-semibold text-sm">
        {(bin.aiConfidence * 100).toFixed(1)}%
    </span>

</div>

                <div className="mt-2">

                    <div className="w-full bg-gray-200 rounded-full h-2">

                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                            style={{
                                width: `${bin.aiConfidence * 100}%`
                            }}
                        />

                    </div>

                   

                </div>

            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500">

    <FaClock />

    <span>
        Last Updated:
    </span>

    <span className="font-medium">
        {new Date(bin.lastUpdated).toLocaleString()}
    </span>

</div>
            <div className="mt-6">

    <label className="block">

        <span className="block text-sm font-semibold text-slate-700 mb-2">
            Upload Image
        </span>

        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];

                setSelectedFile(file);

                if (file) {
                    setPreview(URL.createObjectURL(file));
                } else {
                    setPreview(null);
                }
            }}
            className="
block w-full text-xs sm:text-sm text-slate-500
file:mr-2 sm:file:mr-4
file:px-3 sm:file:px-4
file:py-2
file:rounded-lg
file:border-0
file:bg-blue-100
file:text-blue-700
file:font-medium
hover:file:bg-blue-200
cursor-pointer
"
        />

    </label>

    {selectedFile && (

        <p className="text-sm text-slate-500 mt-3">
            📷 Selected: <span className="font-medium">{selectedFile.name}</span>
        </p>

    )}

    {preview && (

        <img
            src={preview}
            alt="Preview"
            className="mt-4 h-40 sm:h-48 w-full rounded-xl border object-cover"
        />

    )}

    <button
        onClick={handleAnalyze}
        disabled={!selectedFile || loading}
        className={`mt-4 w-full py-2.5 sm:py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
            loading
                ? "bg-gray-500 cursor-not-allowed"
                : selectedFile
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
        }`}
    >
        {loading ? (
            <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
            </div>
        ) : (
            "Analyze Image"
        )}
    </button>

</div>
        </div>
        </div>
    );
}


export default BinCard;
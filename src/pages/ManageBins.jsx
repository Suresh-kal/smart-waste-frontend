import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import EditBinModal from "../components/EditBinModal";
import Navbar from "../components/Navbar";
import api from "../services/api";
import DeleteModal from "../components/DeleteModal";
function ManageBins() {
    const [bins, setBins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedBin, setSelectedBin] = useState(null);
    const statusColor = {
        "EMPTY": "bg-green-500",
        "HALF-FULL": "bg-yellow-400 text-black",
        "FULL": "bg-orange-500",
        "OVERFLOWING": "bg-red-600"
    };
    const [editingBin, setEditingBin] = useState(null);
const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchBins();
    }, []);

    const fetchBins = async () => {
        try {
            const res = await api.get("/bins");
            setBins(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch bins");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {

    try {

        await api.delete(`/bins/${selectedBin.binId}`);

        setBins((prev) =>
            prev.filter(
                (bin) =>
                    bin.binId !== selectedBin.binId
            )
        );

        toast.success("Bin deleted.");

    } catch (err) {

        console.error(err);

        toast.error("Delete failed.");

    } finally {

        setShowDeleteModal(false);

        setSelectedBin(null);

    }
};

    const filteredBins = bins.filter(
        (bin) =>
            bin.binId.toLowerCase().includes(search.toLowerCase()) ||
            bin.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

            <Navbar />

            <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 mt-6">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Manage Waste Bins
                </h1>
        <p className="text-gray-500 mb-6">
    Search, edit, and remove registered waste bins.
</p>
                <div className="relative mb-6">
                    
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search by Bin ID or Location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </div>

                {loading ? (

                    <p className="text-center py-10 text-gray-500">
    Loading bins...
</p>

                ) : filteredBins.length === 0 ? (

                    <div className="bg-slate-50 rounded-xl text-center py-12 text-gray-500">

                        <h2 className="text-2xl font-semibold">
                            No bins found
                        </h2>

                        <p>
                            Register a new waste bin to get started.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto rounded-xl border">

<table className="min-w-[700px] w-full">

                        <thead>

                            <tr className="bg-slate-100 border-b">

                                <th className="text-left py-3">Bin ID</th>
                                <th className="text-left">Location</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Fill %</th>
                                <th className="text-center">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredBins.map((bin) => (

                                <tr
                                    key={bin._id}
                                    className="border-b hover:bg-green-50 transition-colors"
                                >

                                    <td className="py-4 font-medium">
                                        {bin.binId}
                                    </td>

                                    <td>
                                        {bin.location}
                                    </td>

                                    <td>

                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${statusColor[bin.status]}`}
                                        >
                                            {bin.status}
                                        </span>

                                    </td>

                                    <td>
                                        {bin.fillPercentage}%
                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-3">

                                            <button
    onClick={() => {
        setEditingBin(bin);
        setShowModal(true);
    }}
    className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
>
    <FaEdit />
</button>

                                            <button
                                                onClick={() => {
    setSelectedBin(bin);
    setShowDeleteModal(true);
}}
                                                className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

</div>

                )}

            </div>
                    <EditBinModal
    bin={editingBin}
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onSuccess={fetchBins}
/>

<DeleteModal
    isOpen={showDeleteModal}
    binId={selectedBin?.binId}
    onClose={() => {
        setShowDeleteModal(false);
        setSelectedBin(null);
    }}
    onConfirm={handleDelete}
/>
        </div>
    );
}

export default ManageBins;
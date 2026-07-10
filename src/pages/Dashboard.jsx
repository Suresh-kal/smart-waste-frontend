import BinCard from "../components/BinCard";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BinMap from "../components/BinMap";
import Analytics from "../components/Analytics";
import LoadingSpinner from "../components/LoadingSpinner";
function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [search, setSearch] = useState("");
const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/dashboard");
            setDashboard(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!dashboard) {
    return (
        <LoadingSpinner
            text="Loading Dashboard..."
        />
    );
}
    const filteredBins = dashboard.bins.filter((bin) => {

    const matchesSearch =
        bin.binId.toLowerCase().includes(search.toLowerCase()) ||
        bin.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
        filter === "ALL" || bin.status === filter;

    return matchesSearch && matchesFilter;

});
    return (
        <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">
           
            <Navbar />
            <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 sm:py-7 px-8 mt-6 text-white shadow-lg">

    <h1 className="text-2xl sm:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
        Welcome back,
        {" "}
        {JSON.parse(localStorage.getItem("user"))?.name}
        👋
    </h1>

    <p className="mt-3 text-sm sm:text-base lg:text-lg text-green-100">

        Monitor waste bins, AI analysis and collection status in real time.

    </p>

</div>
{dashboard.overflowing > 0 && (

    <div className="bg-red-50 border-l-4 border-red-600 rounded-2xl p-5 mt-8 shadow">

        <div className="flex flex items-start gap-4 sm:items-center gap-3">

            <div className="text-2xl sm:text-3xl sm:text-4xl animate-pulse">
                ⚠️
            </div>

            <div>

                <h2 className="text-xl sm:text-2xl font-bold text-red-700">
                    Overflow Alert
                </h2>

                <p className="text-red-600 mt-1">

                    {dashboard.overflowing} waste bin(s) require immediate collection.

                </p>

            </div>

        </div>

    </div>

)}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
                <StatCard
                    title="Total Bins"
                    value={dashboard.totalBins}
                    color="#3b82f6"
                />

                <StatCard
                    title="Empty"
                    value={dashboard.empty}
                    color="#22c55e"
                />

                <StatCard
                    title="Half Full"
                    value={dashboard.halfFull}
                    color="#facc15"
                />

                <StatCard
                    title="Full"
                    value={dashboard.full}
                    color="#f97316"
                />

                <StatCard
                    title="Overflowing"
                    value={dashboard.overflowing}
                    color="#ef4444"
                />

            </div>

         <div className="mt-10">

    <h2 className="text-xl sm:text-2xl sm:text-3xl font-bold mb-5">
        Live Bin Map
    </h2>

    <BinMap bins={dashboard.bins} />

</div>

<div className="mt-8">

    <h2 className="text-xl sm:text-2xl sm:text-3xl font-bold mb-5">
        Analytics
    </h2>

    <Analytics dashboard={dashboard} />

</div>

            <div className="mt-10">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

    <input
        type="text"
        placeholder="🔍 Search by Bin ID or Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl px-4 py-3 w-full xl:w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <div className="flex flex-wrap gap-2">

        {[
            "ALL",
            "EMPTY",
            "HALF-FULL",
            "FULL",
            "OVERFLOWING"
        ].map((status) => (

            <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition ${
                    filter === status
                        ? "bg-green-600 text-white"
                        : "bg-white border hover:bg-gray-100"
                }`}
            >
                {status}
            </button>

        ))}

    </div>

</div>
                <h2 className="text-xl sm:text-2xl sm:text-3xl font-bold mb-5">
                    Waste Bins
                </h2>

{filteredBins.length > 0 ? (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

        {filteredBins.map((bin) => (

            <BinCard
                key={bin._id}
                bin={bin}
                refreshDashboard={fetchDashboard}
            />

        ))}

    </div>

) : (

    <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center">

        <div className="text-5xl sm:text-6xl">
            📭
        </div>

        <h2 className="text-2xl font-bold mt-4">
            No Bins Found
        </h2>

        <p className="text-gray-500 mt-2">
            No waste bins match your current search or filter.
        </p>

        <button
            onClick={() => {
                setSearch("");
                setFilter("ALL");
            }}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
            Clear Filters
        </button>

    </div>

)}

            </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
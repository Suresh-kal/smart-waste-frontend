import {
    FaTrash,
    FaCheckCircle,
    FaExclamationTriangle,
    FaRecycle,
    FaDumpster
} from "react-icons/fa";

const icons = {
    "Total Bins": <FaTrash className="text-2xl sm:text-3xl text-blue-500" />,
    "Empty": <FaCheckCircle className="text-2xl sm:text-3xl text-green-500" />,
    "Half Full": <FaRecycle className="text-2xl sm:text-3xl text-yellow-500" />,
    "Full": <FaDumpster className="text-2xl sm:text-3xl text-orange-500" />,
    "Overflowing": <FaExclamationTriangle className="text-2xl sm:text-3xl text-red-500" />
};

function StatCard({ title, value, color }) {
    return (
        <div
            className="bg-white rounded-2xl shadow-md border
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300 overflow-hidden"
        >
            {/* Top Accent Bar */}
            <div
                className="h-2 w-full"
                style={{ backgroundColor: color }}
            />

            <div className="p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-slate-800">
                            {value}
                        </h2>

                    </div>

                    <div className="bg-slate-100 rounded-full p-3">
                        {icons[title]}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default StatCard;
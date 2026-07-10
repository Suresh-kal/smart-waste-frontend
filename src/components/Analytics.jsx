import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function Analytics({ dashboard }) {

    const data = [
        {
            name: "Empty",
            value: dashboard.empty
        },
        {
            name: "Half Full",
            value: dashboard.halfFull
        },
        {
            name: "Full",
            value: dashboard.full
        },
        {
            name: "Overflowing",
            value: dashboard.overflowing
        }
    ];

    const fillData = dashboard.bins.map((bin) => ({
        name: bin.binId,
        fill: bin.fillPercentage
    }));
    const averageFill = (
    dashboard.bins.reduce(
        (sum, bin) => sum + bin.fillPercentage,
        0
    ) / dashboard.bins.length
).toFixed(1);

const averageConfidence = (
    dashboard.bins.reduce(
        (sum, bin) => sum + bin.aiConfidence,
        0
    ) / dashboard.bins.length
) * 100;

const highestBin = dashboard.bins.reduce((a, b) =>
    a.fillPercentage > b.fillPercentage ? a : b
);

const criticalBins = dashboard.bins.filter(
    (bin) => bin.fillPercentage >= 90
).length;

    const COLORS = [
        "#22c55e",
        "#eab308",
        "#f97316",
        "#ef4444"
    ];

    return (
        <div className="space-y-10">

            <div className="bg-slate-50 rounded-2xl p-6 border">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
        🧠 AI Insights
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-white rounded-xl p-4 shadow-sm">

            <p className="text-gray-500 text-sm">
                Average Fill Level
            </p>

            <h3 className="text-3xl font-bold text-green-600">
                {averageFill}%
            </h3>

        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">

            <p className="text-gray-500 text-sm">
                Average AI Confidence
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
                {averageConfidence.toFixed(1)}%
            </h3>

        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">

            <p className="text-gray-500 text-sm">
                Highest Filled Bin
            </p>

            <h3 className="text-2xl font-bold">
                {highestBin.binId}
            </h3>

            <p className="text-red-600 font-semibold">
                {highestBin.fillPercentage}%
            </p>

        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">

            <p className="text-gray-500 text-sm">
                Critical Bins
            </p>

            <h3 className="text-3xl font-bold text-red-600">
                {criticalBins}
            </h3>

        </div>

    </div>

</div>

            <div>

                <h2 className="text-xl sm:text-2xl font-bold mb-5">
                    Bin Status Distribution
                </h2>

                <div className="h-72 sm:h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={({ value }) =>
                                    value > 0 ? value : ""
                                }
                            >

                                {data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                ))}

                            </Pie>

                            <Tooltip />

                            <Legend
    wrapperStyle={{
        fontSize: "13px"
    }}
/>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* Bar Chart */}

            <div>

                <h2 className="text-xl sm:text-2xl font-bold mb-5">
                    Fill Percentage
                </h2>

                <div className="h-72 sm:h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={fillData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
    dataKey="name"
    tick={{ fontSize: 12 }}
    interval={0}
/>

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="fill"
                                fill="#3b82f6"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default Analytics;
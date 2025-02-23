import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrderChart = ({ orders }: { orders: any[] }) => {
  // Transform orders data for chart (group by date and sum totals)
  const chartData = orders?.map((order) => ({
    date: new Date(order.created_at).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }), // Format: "10 Nov"
    total: Number(order.total), // Convert to number
  }));

  return (
    <div className="bg-white rounded-lg p-5 shadow-md flex flex-col items-center justify-center min-h-[300px]">
      <h3 className="text-lg font-semibold mb-3">Order Statistics</h3>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            {/* Define the gradient */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#382B67" />
                <stop offset="100%" stopColor="#7056CD" />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tick={{ fill: "#8884d8", fontSize: 10 }} />
            <YAxis tick={{ fill: "#8884d8", fontSize: 10 }} />
            <Tooltip />

            {/* Apply gradient stroke */}
            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrderChart;

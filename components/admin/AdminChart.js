import React from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminChart({ chartData }) {
  const CustomTick = ({ payload, x, y, dataPoint }) => (
    <Link href={dataPoint.url}>
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    </Link>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ResponsiveContainer width="95%" height={400}>
            <BarChart width={1000} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                height={60}
                tick={({ payload, x, y }) => (
                  <CustomTick
                    payload={payload}
                    x={x}
                    y={y}
                    dataPoint={chartData.find(
                      (item) => item.label === payload.value
                    )}
                  />
                )}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

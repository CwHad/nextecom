"use client";

import { useEffect, useState } from "react";
import AdminChart from "@/components/admin/AdminChart";

const AdminDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/chart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("chart data =>", data);

      setChartData(data.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching chart data:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger vh-100 h1">
        LOADING...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Admin Dashboard</p>
          <hr />
          <AdminChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

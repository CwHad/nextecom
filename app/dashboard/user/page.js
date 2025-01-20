"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UserChart from "@/components/user/UserChart";

const UserDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/chart`);
      const data = await response.json();

      setChartData(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Dashboard</p>
          <hr />
          <UserChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

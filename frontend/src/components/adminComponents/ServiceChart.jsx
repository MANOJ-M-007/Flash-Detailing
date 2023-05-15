import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import adminApiCalls from "../../EndPoints/adminApiCalls";

Chart.register(...registerables);

const ServiceChart = () => {
  const [orders, setOrders] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await adminApiCalls.servicesGraphData();
        setOrders(ordersData);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length) {
      const chartData = {
        labels: orders.map((stat) => stat._id),
        datasets: [
          {
            data: orders.map((stat) => stat.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
          },
        ],
      };
      const chartOptions = {
        responsive: true,
      };
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart("orderStatsChart", {
        type: "pie",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [orders]);

  return (
    <div>
      {/* <h2>ORDER STATUS</h2> */}
      <canvas id="orderStatsChart"></canvas>
    </div>
  );
};

export default ServiceChart;

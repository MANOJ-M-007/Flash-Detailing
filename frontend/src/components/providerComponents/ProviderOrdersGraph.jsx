import React, { useEffect, useState, useRef } from "react";
import providerApiCalls from "../../EndPoints/providerApiCall";
import { Chart } from "chart.js";
import styles from "../adminComponents/ChartComponent.css";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Box, Card, Typography } from "@mui/material";

const ProviderOrdersGraph = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    const graphData = async () => {
      const res = await providerApiCalls.graphData(userInfo);
      setData(res);
    };
    graphData();
  }, []);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");
    let chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => format(new Date(item.date), "dd-MM-yyyy")),
        datasets: [
          {
            label: "Total Cost",
            data: data.map((item) => item.total),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
            hoverBorderColor: "rgba(54, 162, 235, 1)",

            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "Rupees",
              font: {
                weight: "bold",
                size: 15,
                color: "#5E4955",
              },
            },
            ticks: {
              beginAtZero: true,
              font: {
                weight: "bold",
                size: 13,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
              font: {
                weight: "bold",
                size: 15,
              },
            },
            ticks: {
              beginAtZero: true,
              font: {
                weight: "bold",
                size: 13,
                // color:'rgba(54, 162, 235, 0.2)'
                color: "#5E4955",
              },
            },
          },
        },
        barThickness: 30,
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <Box>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          marginTop: "10px",
        }}
      >
        <Typography
          sx={{
            marginTop: "10px",
            marginBottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#957777",
            fontFamily: "fantasy",
            fontSize: "20px",
          }}
        >
          DAILY ORDERS
        </Typography>

        <div
          className={styles.chartContainer}
          style={{
            maxWidth: "600px",
            maxHeight: "500px",
            height: "400px",
            minWidth: "350px",
          }}
        >
          <canvas ref={chartRef} className={styles.chartCanvas} />
        </div>
      </Card>
    </Box>
  );
};

export default ProviderOrdersGraph;

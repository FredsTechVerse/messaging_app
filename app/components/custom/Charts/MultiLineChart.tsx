"use client";
import React, { FC } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface Props {
  chartData: any;
  chartName: string;
}

const MultiLineChart: FC<Props> = ({ chartData, chartName }) => {
  return (
    <div className="chart-container">
      <h2 className="uppercase mx-auto w-max">{chartName}</h2>
      <Chart type="bar" data={chartData} />
    </div>
  );
};

export default MultiLineChart;

"use client";

import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  chartData: any;
  doughnutName: string;
  doughnutValue: number;
}
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
];

// const data: any = {
//   labels,
//   datasets: [
//     {
//       label: "Tenants",
//       borderColor: "rgb(255, 99, 132)",
//       borderWidth: 2,
//       data: [24, 12, 36, 28, 30, 37, 53, 43, 28],
//     },
//     {
//       label: "Payments",
//       backgroundColor: "rgb(75, 192, 192)",
//       data: [24, 12, 36, 28, 30, 37, 53, 43, 20],
//       borderColor: "white",
//       borderWidth: 2,
//     },
//     {
//       label: "Arrears",
//       backgroundColor: "rgb(53, 162, 235)",
//       data: [18, 6, 18, 14, 20, 27, 53, 43, 28],
//     },
//   ],
// };
const DoughnutChart: FC<Props> = ({
  chartData,
  doughnutName,
  doughnutValue,
}) => {
  const options = {
    borderRadius: 10,
    borderWidth: 1,
    spacing: 5,
    circumference: 360,
    cutout: "75%",
    animation: { animateScale: true, animateRotate: true },

    plugins: {
      title: { display: false },
      legend: { display: false },
    },
  };

  return (
    <div className=" h-60 tablet:h-44 laptop:h-60 aspect-square flex-row-centered relative ">
      <Doughnut data={chartData} options={options}></Doughnut>

      <div className="absolute flex-col-centered">
        <p className="font-extralight text-md tablet:text-sm laptop:text-md capitalize">
          {doughnutName}
        </p>
        <p className="text-2xl tablet:text-xl laptop:text-2xl font-bold">
          {doughnutValue}
        </p>
      </div>
    </div>
  );
};

export default DoughnutChart;

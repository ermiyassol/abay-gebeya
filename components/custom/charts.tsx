"use client"; // if you use app dir, don't forget this line

import {
  DashboardData,
  FloatVsUsageData,
  PerformanceDashboardData,
} from "@/types/floatTypes";
import { roundToTwoDecimal } from "@/utils/helperFunctions";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function FloatVsUsage(chartData: DashboardData) {
  const floatVsUsageData = chartData.availabilityVsUsage;
  const days: string[] = [];
  const data: any[] = [];
  const usage: number[] = [];
  const availablity: number[] = [];
  for (const [key, value] of Object.entries(floatVsUsageData)) {
    days.push(key.slice(0, 7));
    data.push(value);
  }
  data.forEach((element) => {
    usage.push(element[0]);
    availablity.push(element[1]);
  });

  const option = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: days,
      title: {
        text: 'Days',
        style: {
          fontSize: '16px',
        },
      },
    },
    yaxis: { 
      title: {
        text: 'Amount',
        style: {
          fontSize: '16px',
        },
      },
    },
    colors: ["#f97316", "#139d4b"],
  };

  const series = [
    {
      name: "Float Availablity",
      data: availablity,
    },
    {
      name: "Float Usage",
      data: usage,
    },
  ];
  return (
    <>
      <ApexChart type="bar" options={option} series={series} height={400}  width={"100%"} />
    </>
  );
}

export function AverageFloatArea(chartData: DashboardData) {
  const option = {
    chart: {
      id: "basic-area",
    },
    xaxis: {
      categories: chartData?.averageGrossByLocation?.map((el) => {
        return el.location;
      }),
      title: {
        text: 'Location Name',
        style: {
          fontSize: '16px',
        },
      },
    },
    yaxis: { 
      title: {
        text: 'Float Amount',
        style: {
          fontSize: '16px',
        },
      },
    },
    colors: ["#139d4b"],
  };

  const series = [
    {
      name: "Float Availablity",
      data: chartData?.averageGrossByLocation?.map((el) => {
        return roundToTwoDecimal(el.average);
      }),
    },
  ];
  return (
    <>
      <ApexChart type="area" options={option} series={series} height={400}  width={"100%"} />
    </>
  );
}

export function PerformanceDashboardLineChart(
  chartData: PerformanceDashboardData
) {
  const option = {
    chart: {
      id: "basic-area",
    },
    title: {
      text: chartData.title,
    },
    stroke: {
      width: 2 // Set the stroke weight here (e.g., 2 pixels)
  },
    xaxis: {
      categories: chartData.categories,
    },
    colors: [
      "#28A745",  // Darker Green
      "#C70039",  // Darker Red
      "#1E6FBA",  // Darker Blue
      "#D6D600",  // Darker Yellow
      "#C700B8",  // Darker Pink
      "#C76D00",  // Darker Orange
      "#3E0079",  // Darker Indigo
      "#A2006D",  // Darker Deep Pink
      "#28C1C1",  // Darker Aqua
      "#A20088"   // Darker Purple
  ],
  };

  const series = chartData.series;
  return (
    <div className="shadow-sm p-2">
      <ApexChart type="line" options={option} series={series} height={400} />
    </div>
  );
}

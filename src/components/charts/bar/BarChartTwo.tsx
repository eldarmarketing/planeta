import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartTwo() {
  const series = [
    {
      name: "Иванов А.",
      data: [28, 32, 25, 30, 27, 35, 29, 31],
    },
    {
      name: "Петров С.",
      data: [22, 26, 23, 28, 24, 30, 25, 27],
    },
    {
      name: "Сидоров В.",
      data: [18, 21, 19, 23, 20, 25, 22, 24],
    },
    {
      name: "Козлов Д.",
      data: [15, 18, 16, 20, 17, 22, 19, 21],
    },
  ];
  const options: ApexOptions = {
    colors: ["#2a31d8", "#465fff", "#7592ff", "#c2d6ff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      stacked: true,
      height: 315,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 400,
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        formatter: (val: number) => `${val}`,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val} заказов`,
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartSix" className="min-w-[1000px]">
        <Chart options={options} series={series} type="bar" height={315} />
      </div>
    </div>
  );
}

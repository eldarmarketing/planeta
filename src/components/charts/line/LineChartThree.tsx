import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function LineChartThree() {
  // Данные выручки за последний год (ежедневно)
  const generateRevenueData = () => {
    const data = [];
    const startDate = new Date(2024, 0, 1);
    let baseRevenue = 85000;
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Добавляем сезонность и случайные колебания
      const dayOfWeek = date.getDay();
      const monthMultiplier = 1 + Math.sin((date.getMonth() / 12) * Math.PI) * 0.2;
      const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
      const randomFactor = 0.8 + Math.random() * 0.4;
      
      const revenue = Math.round(baseRevenue * monthMultiplier * weekendMultiplier * randomFactor);
      data.push([date.getTime(), revenue / 1000]);
      
      // Постепенный рост базовой выручки
      baseRevenue += 50;
    }
    
    return data;
  };

  const data = generateRevenueData();
  
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 335,
      id: "area-datetime",
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [1],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (val: number) => `${val.toFixed(0)} тыс. ₽`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        formatter: (val: number) => `${val.toFixed(0)}K`,
      },
    },
  };

  const series = [
    {
      name: "Дневная выручка",
      data: data,
    },
  ];
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px] 2xl:min-w-full">
        <Chart options={options} series={series} type="area" height={335} />
      </div>
    </div>
  );
}

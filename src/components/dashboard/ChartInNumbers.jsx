import Chart from "react-apexcharts";
import Card from "./templates/Card";

const ChartInNumbers = () => {
  const lineChartData = [
    {
      name: "Vouchers",
      data: [1, 4, 3, 22, 5, 2, 4, 23, 5],
    },
    {
      name: "Gift cards",
      data: [3, 9, 4, 14, 29, 29, 30, 23, 40],
    },
  ];

  const lineChartOptions = {
    chart: {
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#e33bb9",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#e33bb9",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#7a1561", "#d173ba"],
    },
    colors: ["#7a1561", "#d173ba"],
  };

  const barChartData = [
    {
      name: "Sales",
      data: [330, 250, 110, 300, 490, 350, 270, 130, 425, 330, 250, 110],
    },
  ];

  const barChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        backgroundColor: "red",
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          backgroundColor: "red",
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      show: false,
      labels: {
        show: false,
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "#fff",
      labels: {
        show: true,
        style: {
          colors: "#fff",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "12px",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  };

  return (
    <Card
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #d173ba 2.25%, #7a1561 79.87%)"
      position="relative"
    >
      <Chart
        options={barChartOptions}
        series={barChartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
};

export default ChartInNumbers;

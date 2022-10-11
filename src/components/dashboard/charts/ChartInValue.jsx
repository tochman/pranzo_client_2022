import ReactApexChart from "react-apexcharts";

const ChartInValue = () => {

  const lineChartData = [
    {
      name: "Vouchers",
      data: [1023, 400, 332, 2200, 504, 2100, 490, 230, 555],
    },
    {
      name: "Gift cards",
      data: [300, 900, 400, 1400, 2900, 2900, 3000, 2300, 400],
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


  return (
    <ReactApexChart
        options={lineChartOptions}
        series={lineChartData}
        type="area"
        width="100%"
        height="100%"
      />
  )
}

export default ChartInValue
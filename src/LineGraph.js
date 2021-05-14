import React, {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2"
import axios from 'axios'
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data[casesType]) {
    if(lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      }
    chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date]

  }
 return chartData
}
// const setColor = casesTypes => {
//   let color = {
//     rgba: "rgba(204, 16, 52, 0.5)",
//     hex: "#CC1034"
//   }
//   if(casesTypes === "recovered") {
//   color.rgba = "rgba(125, 215, 29, 0.5)"
//   color.hex = "#7DD71D"
//   }

//   if(casesTypes === "recovered") {
//     color.rgba = "rgba(118, 28, 214, 0.5)"
//     color.hex = "#761CD6"
//     }
//     return color;
// }


function LineGraph({casesType, ...props}) {
  const [data, setData] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("rgba(204, 16, 52, 0.5)")
  const [borderColor, setBorderColor] = useState("#CC1034")



  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      console.log(data);
      let chartData = buildChartData(data, casesType);
      setData(chartData);
      if(casesType === "cases") {
        setBackgroundColor("rgba(204, 16, 52, 0.5)");
        setBorderColor("#CC1034")
        }
      if(casesType === "recovered") {
        setBackgroundColor("rgba(125, 215, 29, 0.5)");
        setBorderColor("#7DD71D")
        }
        if(casesType === "deaths") {
          setBackgroundColor("rgba(118, 28, 214, 0.5)");
          setBorderColor("#761CD6")
          }

    }


    fetchData()
  }, [casesType])


  return (
    <div className={props.className}>
     {data.length? <Line
  data={{
    datasets: [
      {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        data: data
      }
    ],
  }}
options={options}
/> : null }

    </div>
  )
}

export default LineGraph

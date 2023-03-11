import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
  );
  
 

 interface Data{
  iteration: number;
  Xl: number;
  Xm: number;
  Xr: number;
  Err: number;
  ErrNotDecimal: number;
 }

 interface chartData{
  dataChart:Data[]
 }

function ReactChart({dataChart}:chartData) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    tooltips: {
        callbacks: {
          label: function(tooltipItem:any) {
            return tooltipItem.yLabel.toFixed(5); // set the number of decimal places here
          }
        }
      },
      
    
  };
  
  const labels = dataChart.map((x)=>x.Err);
  
  const data = {
    labels,
    datasets: [
      {
        label: `ERR`,
        data: dataChart.map((x)=>x.Err),
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <div>
        <Line  data={data} options={options} />
    </div>
  )
}

export default ReactChart
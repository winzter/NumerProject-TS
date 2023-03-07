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
  );
  
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
  
  const labels = ["Jun 2016", "Jul 2016", "Aug 2016", "Sep 2016", "Oct 2016", "Nov 2016", "Dec 2016", "Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017"];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset1',
        data: [26.4231435453, 39.8231435453, 66.8231435453, 66.4231435453, 40.6231435453, 55.2231435453, 77.4231435453, 69.8231435453, 57.8231435453, 76, 110.8, 142.6],
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };


function ReactChart() {
  return (
    <div>
        <Line  data={data} options={options} />
    </div>
  )
}

export default ReactChart
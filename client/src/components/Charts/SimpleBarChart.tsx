import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import './Charts.scss';

interface SimpleBarChartProps {
  data: any[];
}


const SimpleBarChart: React.FC<SimpleBarChartProps>  = (props) =>  {
  return (
    <div className="charts">
        <BarChart
      width={525}
      height={400}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="y" fill="#8884d8" />
      <Bar dataKey="x" fill="#82ca9d" />
    </BarChart>
    </div>
  );
}


export default SimpleBarChart;
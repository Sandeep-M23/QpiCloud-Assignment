import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import './Charts.scss';

interface SimpleLineChartProps {
  data: any[];
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = (props) => {
    return (
      <div className="charts">
        <LineChart width={650} height={400} data={props.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="x" stroke="#8884d8" />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
}
export default SimpleLineChart;
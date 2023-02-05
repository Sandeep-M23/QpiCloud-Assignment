import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Charts.scss";

interface SimpleAreaChartProps {
  data: any[];
}

const SimpleAreaChart: React.FC<SimpleAreaChartProps> = (props) => {
  return (
    <div className="charts">
      <AreaChart
        width={525}
        height={400}
        data={props.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="x" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default SimpleAreaChart;
import React, { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Charts.scss";

interface PieData {
  name: string;
  value: number;
}

interface SimplePieChartProps {
  data: PieData[];
}

const COLORS = ["#2B0B3F", "#A5C1DC", "#74BBFB", "#00008B","#7982B9"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SimplePieChart: FC<SimplePieChartProps> = (props) => {
  return (
    <div className="charts">
      <PieChart width={400} height={400}>
        <Pie
          data={props.data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default SimplePieChart;

import React, { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import Sidebar from "../../components/Sidebar/Sidebar";
import SimpleLineChart from "../../components/Charts/SimpleLineChart";
import SimpleBarChart from "../../components/Charts/SimpleBarChart";
import SimplePieChart from "../../components/Charts/SimplePieChart";
import SimpleAreaChart from "../../components/Charts/SimpleAreaChart";
import Spinner from "../../components/Spinner/Spinner";
import "./Dashboard.scss";

interface ChartData {
  [key: string]: any;
}

interface PieData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [lineData, setLineData] = useState<ChartData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [areaData, setAreaData] = useState<ChartData[]>([]);
  const [barData, setBarData] = useState<ChartData[]>([]);
  const [loading,setLoading] = useState<Boolean>(true);


  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 4000);

    const socket = SocketIOClient(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/`)

    console.log(import.meta.env.VITE_REACT_APP_BACKEND_UR)

    socket.on("data", (b,l,a,p) => {
      setBarData(b);
      setLineData(l);
      setAreaData(a);
      setPieData(p);
    });

    return () => {
      socket.disconnect();
    };
  }, [barData]);

  return (
    <>
      <Sidebar />
      <div className="home">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <SimpleBarChart data={barData} />
            <SimpleAreaChart data={areaData} />
            <SimpleLineChart data={lineData} />
            <SimplePieChart data={pieData} />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

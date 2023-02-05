import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import "./Maps.scss";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

interface MarkerType {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
}

const markers: MarkerType[] = [
  {
    markerOffset: -15,
    name: "Bangalore",
    coordinates: [77.598, 12.9699],
  },
  {
    markerOffset: -15,
    name: "Delhi",
    coordinates: [77.06971, 28.679079],
  },
  {
    markerOffset: -15,
    name: "Mumbai",
    coordinates: [72.8333, 18.9667],
  },
  {
    markerOffset: -15,
    name: "Ahmedabad",
    coordinates: [72.58, 23.03],
  },
  {
    markerOffset: -15,
    name: "Kolkata",
    coordinates: [88.3378, 22.5411],
  },
  {
    markerOffset: -15,
    name: "Lucknow",
    coordinates: [80.949997, 26.85],
  },
  {
    markerOffset: -15,
    name: "Andaman & Nicobar",
    coordinates: [92.5, 10.7449],
  },
];

const Maps: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="maps">
        {loading && <Spinner />}
        {!loading && (
          <ComposableMap
            projection="geoMercator"
            width={500}
            height={400}
            projectionConfig={{
              center: [78.9629, 22.5937],
              scale: 700,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#fff"
                      stroke="#D6D6DA"
                    />
                  );
                })
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={3} fill="#0571e0" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#5D5A6D",
                    fontSize: "0.8rem",
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        )}
      </div>
    </>
  );
};

export default Maps;

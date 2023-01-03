import "./chart.scss";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
} from "recharts";

const Chart = ({ aspect, title, callingComponent }) => {
  if (callingComponent === "dashboard") {
    const data = [
      {
        month: "January",
        "Total Alerts": 12,
        "Successful Alerts": 8,
      },
      {
        month: "February",
        "Total Alerts": 15,
        "Successful Alerts": 7,
      },
      {
        month: "March",
        "Total Alerts": 5,
        "Successful Alerts": 3,
      },
      {
        month: "April",
        "Total Alerts": 19,
        "Successful Alerts": 1,
      },
      {
        month: "May",
        "Total Alerts": 15,
        "Successful Alerts": 14,
      },
      {
        month: "June",
        "Total Alerts": 29,
        "Successful Alerts": 2,
      },
    ];

    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart
            width={730}
            height={250}
            data={data.filter((dataset, index) => index >= data.length - 6)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total Alerts" fill="#8884d8" />
            <Bar dataKey="Successful Alerts" fill="#4BB543" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (callingComponent === "driver") {
    const data = [
      {
        month: "January",
        Alerts: 12,
      },
      {
        month: "February",
        Alerts: 15,
      },
      {
        month: "March",
        Alerts: 5,
      },
      {
        month: "April",
        Alerts: 19,
      },
      {
        month: "May",
        Alerts: 15,
      },
      {
        month: "June",
        Alerts: 29,
      },
    ];
    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart
            width={730}
            height={250}
            data={data.filter((dataset, index) => index >= data.length - 6)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Alerts" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default Chart;

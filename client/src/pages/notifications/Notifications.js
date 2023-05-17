import "./notifications.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BugsTable from "../../components/bugstable/BugsTable";
import { useEffect, useState } from "react";
import database from "../../firebase/database";
import cloud from "../../firebase/cloud";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    database.getAllAlerts((alerts) => {
      setBugs(alerts);
      console.log(alerts);
    });
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <BugsTable bugs={bugs} />
      </div>
    </div>
  );
};

export default Notifications;

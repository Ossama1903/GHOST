import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriverDatatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import database from "../../firebase/database";

const List = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    database.getUsersByRole("driver", (users) => {
      setDrivers(users);
    });
  }, []);

  

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DriverDatatable drivers={drivers} />
      </div>
    </div>
  );
};

export default List;

import "./bugs.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriverDatatable from "../../components/datatable/Datatable";
import BugsTable from "../../components/bugstable/BugsTable";
import { useEffect, useState } from "react";
import database from "../../firebase/database";

const List = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    database.getBugs((bugs) => {
      setBugs(bugs);
      console.log(bugs);
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

export default List;

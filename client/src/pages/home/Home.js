import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import database from "../../firebase/database";
import "./home.scss";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    database.createNewUser(
      3,
      "afnanhashmi112233@gmail.com",
      "thisismypassword",
      "Afnan",
      "Hashmi",
      "admin",
      "--",
      "male",
      "2002-10-04"
    );
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="driver" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Alerts (Last 6 months)"
            aspect={2 / 1}
            callingComponent="dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="driver" />
          <Widget type="admin" />
          <Widget type="bug" />
          {/* <Widget type="alert" /> */}
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

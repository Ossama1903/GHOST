import "./driver.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { useParams } from "react-router-dom";

const Driver = () => {

  const {id} = useParams()

  //GET DATA WITH USING REST API AGAINST id

  //dummy data
  const data = {
    firstname: "Jane",
    lastname: "Doe",
    email: "janedoe@gmail.com",
    phone: "+1 2345 67 89",
    address: "Elton St. 234 Garden Yd. NewYork",
    gender: "Female",
    age: "26",
    isActive: true,
    imgSrc: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  };

  return (
    <div className="driver">
      <Sidebar />
      <div className="driverContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <div style={{ display: "flex" }}>
              <h1 className="title">Driver Information</h1>
            </div>
            <div className="item">
              <img
                src={data.imgSrc}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">
                  <div className="name">
                    {data.firstname} {data.lastname}
                  </div>
                  <div
                    className={`statusCircle ${
                      data.isActive ? "active" : "inactive"
                    }`}
                  >
                    <CircleIcon fontSize="small" />
                  </div>
                </h1>

                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{data.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{data.age}</span>
                </div>
                <div className="actionButtons">
                  <Button className="actionButton" variant="outlined">
                    SEND REPORT
                  </Button>
                  <Button
                    color="error"
                    className="actionButton"
                    variant="outlined"
                  >
                    <AssistantPhotoIcon />
                    <span style={{marginLeft: "0.3rem"}}>{`FLAG ${data.firstname}`}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={3 / 2}
              title="Driver Reports ( Last 6 Months)"
              callingComponent={"driver"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;

import "./driver.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import database from "../../firebase/database";

const Driver = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    database.getUserById(id, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
              <img src={user.image} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  <div className="name">
                    {user.firstName} {user.lastName}
                  </div>
                  <div
                    className={`statusCircle ${
                      !user.isFlagged ? "active" : "inactive"
                    }`}
                  >
                    <CircleIcon fontSize="small" />
                  </div>
                </h1>

                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of birth:</span>
                  <span className="itemValue">{user.dateOfBirth}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span
                    className="itemValue"
                    style={{ textTransform: "capitalize" }}
                  >
                    {user.gender}
                  </span>
                </div>

                <div className="actionButtons">
                  <Button className="actionButton" variant="outlined">
                    SEND REPORT
                  </Button>
                  {!user.isFlagged && (
                    <Button
                      color="error"
                      className="actionButton"
                      variant="outlined"
                      onClick={() => database.updateUserFlag(id, true)}
                    >
                      <AssistantPhotoIcon />
                      <span
                        style={{ marginLeft: "0.3rem" }}
                      >{`FLAG ${user.firstName}`}</span>
                    </Button>
                  )}
                  {user.isFlagged && (
                    <Button
                      color="success"
                      className="actionButton"
                      variant="outlined"
                      onClick={() => database.updateUserFlag(id, false)}
                    >
                      <AssistantPhotoIcon />
                      <span
                        style={{ marginLeft: "0.3rem" }}
                      >{`FLAG ${user.firstName}`}</span>
                    </Button>
                  )}
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

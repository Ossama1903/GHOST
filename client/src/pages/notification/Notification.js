import "./notification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import database from "../../firebase/database";
import cloud from "../../firebase/cloud";

const Notification = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState();
  const [url, setUrl] = useState("");

  useEffect(() => {
    database.getUserById(id, (user) => {
      setUser(user);
    });

    cloud
      .getUserImage(id)
      .then((url) => {
        console.log(url);
        setUserImageUrl(url);
      })
      .catch((e) => {
        console.log(e);
        setUserImageUrl();
      });
  }, []);

  useEffect(() => {
    cloud.getAlertVideo("test.mp4").then((response) => {
      setUrl(response);
      console.log(typeof response);
    });
  }, []);

  return (
    <div className="driver">
      <Sidebar />
      <div className="driverContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div style={{ display: "flex" }}>
              <h1 className="title">Driver Information</h1>
            </div>
            <div className="item">
              <img
                src={
                  userImageUrl
                    ? userImageUrl
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className="itemImg"
              />
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
                      >{`CLEAR ${user.firstName}`}</span>
                    </Button>
                  )}
                </div>
              </div>
              {url && (
                <video
                  controls
                  style={{
                    width: "400px",
                    height: "300px",
                    marginInline: "auto",
                  }}
                >
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

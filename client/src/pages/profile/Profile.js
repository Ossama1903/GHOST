import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import database from "../../firebase/database";
import cloud from "../../firebase/cloud";
import { useAuth } from "../../contexts/userContext";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const Driver = () => {
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState();
  const { currentUser, signOutAdmin } = useAuth();

  useEffect(() => {
    database.getUserById(currentUser.uid, (user) => {
      setUser(user);
    });

    cloud
      .getUserImage(currentUser.uid)
      .then((url) => {
        console.log(url);
        setUserImageUrl(url);
      })
      .catch((e) => {
        console.log(e);
        setUserImageUrl();
      });
  }, []);

  return (
    <div className="driver">
      <Sidebar />
      <div className="driverContainer">
        <Navbar />
        <div
          className="top"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="left"
            style={{ maxWidth: "400px", minHeight: "80vh" }}
          >
            <div style={{ display: "flex" }}>
              <h1 className="title">Personal Information</h1>
            </div>
            <div className="item" style={{ marginTop: "50px" }}>
              <img
                style={{ marginTop: "20px" }}
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
                  <div className="name" style={{ textTransform: "capitalize" }}>
                    {user.firstName} {user.lastName}
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
              </div>
            </div>
            <div className="actionButtons">
              <Button
                onClick={() => {
                  signOutAdmin(() => {});
                }}
                color="error"
                className="actionButton"
                variant="outlined"
              >
                <LogoutIcon className="icon" />
                <span style={{ marginLeft: "0.3rem" }}>{`LOGOUT`}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;

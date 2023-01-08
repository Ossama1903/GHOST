import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import database from "../../firebase/database";
import cloud from "../../firebase/cloud";
// import CircleIcon from "@mui/icons-material/Circle";
// import Button from "@mui/material/Button";
// import EditIcon from "@mui/icons-material/Edit";

const Driver = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState();

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
            <div className="editButton">Edit</div>
            <div style={{ display: "flex" }}>
              <h1 className="title">Personal Information</h1>
            </div>
            <div className="item" style={{ marginTop: "50px" }}>
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
            {/* <div className="actionButtons">
              <Button className="actionButton" variant="outlined">
                <EditIcon />
                <span
                  style={{ marginLeft: "0.3rem" }}
                >{`EDIT INFORMATION`}</span>
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;

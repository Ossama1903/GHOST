import "./newDriver.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import database from "../../firebase/database";

function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [date, setDate] = useState(null);
  const [textData, setTextData] = useState({
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    password: null,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    database.createNewUser(
      textData.email,
      textData.password,
      textData.firstName,
      textData.lastName,
      "driver",
      file,
      textData.gender,
      date
    );
  };

  return (
    <div className="newDriver">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setTextData({ ...textData, firstName: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setTextData({ ...textData, lastName: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="Gender"
                  onChange={(e) => {
                    setTextData({ ...textData, gender: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setTextData({ ...textData, email: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setTextData({ ...textData, password: e.target.value });
                  }}
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of Birth"
                  value={date}
                  onChange={(newValue) => {
                    setDate(
                      `${newValue.$y}-${pad(newValue.$M + 1)}-${pad(
                        newValue.$D
                      )}`
                    );
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <button
                style={{ width: "70%" }}
                className="submit-button"
                onClick={submitHandler}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

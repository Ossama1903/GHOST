import "./newDriver.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useRef } from "react";
import { useAuth } from "../../contexts/userContext";
import CircularProgress from "@mui/material/CircularProgress";
function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [date, setDate] = useState(null);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [inSuccessAnimation, setInSuccessAnimation] = useState(false);
  const [inErrorAnimation, setInErrorAnimation] = useState(false);
  const [textData, setTextData] = useState({
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    password: null,
  });
  const [error, setError] = useState("");
  const { createNewUser } = useAuth();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      genderRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      file === "" ||
      date === ""
    ) {
      setError("Please provide all of the necessary information");
      return;
    }
    setIsAwaitingResponse(true);
    createNewUser(
      textData.email,
      textData.password,
      textData.firstName,
      textData.lastName,
      "driver",
      file,
      textData.gender,
      date
    )
      .then((userId) => {
        setIsAwaitingResponse(false);
        setInSuccessAnimation(true);
        setInterval(() => {
          setInSuccessAnimation(false);
        }, 2000);
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        genderRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch((e) => {
        setIsAwaitingResponse(false);
        setInErrorAnimation(true);
        setInterval(() => {
          setInErrorAnimation(false);
        }, 2000);
        console.log(e);
      });
  };

  return (
    <div className="newDriver">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>REGISTER A NEW DRIVER</h1>
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
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "image/jpeg" ||
                      e.target.files[0].type === "image/png"
                    ) {
                      setFile(e.target.files[0]);
                      setError("");
                    } else setError("Please upload a png or jpeg file");
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="First Name"
                  ref={firstNameRef}
                  onChange={(e) => {
                    setTextData({ ...textData, firstName: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="Last Name"
                  ref={lastNameRef}
                  onChange={(e) => {
                    setTextData({ ...textData, lastName: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="Gender"
                  ref={genderRef}
                  onChange={(e) => {
                    setTextData({ ...textData, gender: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  onChange={(e) => {
                    setTextData({ ...textData, email: e.target.value });
                  }}
                />
              </div>
              <div className="formInput">
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
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
                    if (newValue) {
                      setDate(
                        `${newValue.$y}-${pad(newValue.$M + 1)}-${pad(
                          newValue.$D
                        )}`
                      );
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Box
                sx={
                  error
                    ? {
                        width: "70%",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "-40px",
                        fontSize: "12px",
                      }
                    : {
                        width: "70%",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "-40px",
                        visibility: "hidden",
                        fontSize: "12px",
                      }
                }
              >
                <p style={{ marginTop: "15px", color: "red" }}>
                  {error ? error : "."}
                </p>
              </Box>
              {!isAwaitingResponse && (
                <button
                  style={
                    inSuccessAnimation
                      ? { width: "70%", backgroundColor: "#4FBF26" }
                      : inErrorAnimation
                      ? { width: "70%", backgroundColor: "#F20000" }
                      : { width: "70%" }
                  }
                  className="submit-button"
                  onClick={submitHandler}
                >
                  REGISTER
                </button>
              )}
              {isAwaitingResponse && (
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress sx={{ height: "10px" }} />
                </Box>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

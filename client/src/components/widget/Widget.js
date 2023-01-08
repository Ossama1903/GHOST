import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import database from "../../firebase/database";

const Widget = ({ type }) => {
  let data;

  const [drivers, setDrivers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [bugs, setBugs] = useState([]);

  //temporary
  var amount = 0;

  useEffect(() => {
    database.getUsersByRole("driver", (drivers) => {
      setDrivers(drivers);
    });
    database.getUsersByRole("admin", (admins) => {
      setAdmins(admins);
    });
    database.getBugs((bugs) => {
      setBugs(bugs);
    });
  }, []);

  switch (type) {
    case "driver":
      amount = drivers.length;
      data = {
        title: "DRIVERS",
        link: "View all drivers",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "admin":
      amount = admins.length;
      data = {
        title: "ADMINS",
        link: "Add new admin",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "bug":
      amount = bugs.length;
      data = {
        title: "BUGS",
        link: "View all bugs",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "alert":
      data = {
        title: "ALERTS",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;

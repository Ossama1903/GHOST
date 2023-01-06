import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/Error";
import { Link, useNavigate } from "react-router-dom";
import authentication from "../../firebase/authentication";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">ghostadmin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" className="react-link">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/drivers" className="react-link">
            <li>
              <PersonIcon className="icon" />
              <span>Drivers</span>
            </li>
          </Link>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <ErrorIcon className="icon" />
            <span>Bug Reports</span>
          </li>
          <p className="title">ADMIN</p>
          <li>
            <PersonPinIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <AddIcon className="icon" />
            <span>New Admin</span>
          </li>
          <p className="title">OTHERS</p>
          <Link to="#" className="react-link">
            <li
              onClick={() => {
                authentication.signOutAdmin(() => {
                  navigate("/login");
                });
              }}
            >
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

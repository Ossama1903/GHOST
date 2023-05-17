import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/userContext";

const Sidebar = () => {
  const { signOutAdmin } = useAuth();

  return (
    <div className="sidebar">
      <div className="top">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ width: "100px" }} src="./sidebarLogo.png" />
        </Link>
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
          <Link to="/notifications" className="react-link">
            <li>
              <NotificationsIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>
          <Link to="/bugs" className="react-link">
            <li>
              <ErrorIcon className="icon" />
              <span>Bug Reports</span>
            </li>
          </Link>
          <p className="title">ADMIN</p>
          <Link to="/profile" className="react-link">
            <li>
              <PersonPinIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/new-admin" className="react-link">
            <li>
              <AddIcon className="icon" />
              <span>New Admin</span>
            </li>
          </Link>
          <p className="title">OTHERS</p>
          <Link to="#" className="react-link">
            <li
              onClick={() => {
                signOutAdmin(() => {});
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

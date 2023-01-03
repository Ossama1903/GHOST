import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import DragHandleIcon from "@mui/icons-material/DragHandle";

import { useEffect, useState } from "react";

const Featured = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      totalAlerts: 56,
      successfulAlerts: 1,
      lastMonthAlertCount: 32,
    });
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Alerts this month</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={((data.successfulAlerts / data.totalAlerts) * 100).toFixed(
              2
            )}
            text={`${((data.successfulAlerts / data.totalAlerts) * 100).toFixed(
              2
            )}%`}
            strokeWidth={5}
          />
        </div>
        <p>Success ratio</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Total</div>
            <div className="itemResult negative">
              <div className="resultAmount">{data.totalAlerts}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Successful</div>
            <div className="itemResult positive">
              <div className="resultAmount">{data.successfulAlerts}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            {data.lastMonthAlertCount > data.totalAlerts && (
              <div className="itemResult positive">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">
                  {" "}
                  {String(
                    (
                      (data.totalAlerts / data.lastMonthAlertCount) *
                      100
                    ).toFixed(2)
                  )}
                  %
                </div>
              </div>
            )}
            {data.lastMonthAlertCount < data.totalAlerts && (
              <div className="itemResult negative">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">
                  {" "}
                  {String(
                    (
                      (data.lastMonthAlertCount / data.totalAlerts) *
                      100
                    ).toFixed(2)
                  )}
                  %
                </div>
              </div>
            )}
            {data.lastMonthAlertCount === data.totalAlerts && (
              <div className="itemResult">
                <DragHandleIcon fontSize="small" />
                <div className="resultAmount">0%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

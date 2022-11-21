import "./driver.scss";
import { useParams } from "react-router-dom";

const Driver = () => {
  let { driverId } = useParams();

  return <div>{driverId}</div>;
};

export default Driver;

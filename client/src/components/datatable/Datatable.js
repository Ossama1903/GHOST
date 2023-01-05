import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { driverColumns, driverRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const DriverDatatable = () => {
  const [data, setData] = useState(driverRows);
  const [drivers, setDrivers] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/drivers/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link
          style={{ textTransform: "uppercase" }}
          to="/drivers/new"
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={driverColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DriverDatatable;

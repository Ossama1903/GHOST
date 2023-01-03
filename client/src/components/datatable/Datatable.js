import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { driverColumns, driverRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = () => {
  const [data, setData] = useState(driverRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  //ACTION COLUMN IS USED CONCATENADED TO THE DATAGRID'S COLUMNS FOR DISPLAY
  //INCLUDES view button and delete button
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/drivers/${params.row.id}`} style={{ textDecoration: "none" }}>
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

export default Datatable;

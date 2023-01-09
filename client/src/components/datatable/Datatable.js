import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import cloud from "../../firebase/cloud";
import { useAuth } from "../../contexts/userContext";
import { deleteUserFromAdmin } from "../../api/admin";

const DriverDatatable = ({ drivers }) => {
  const { deleteUser } = useAuth();

  const driverColumns = [
    {
      field: "driver",
      headerName: "Driver",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellWithImg" style={{ textTransform: "capitalize" }}>
            {`${params.row.firstName}  ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            {params.row.isFlagged && (
              <div className={`cellWithStatus flagged`}>flagged</div>
            )}
            {!params.row.isFlagged && (
              <div className={`cellWithStatus clear`}>clear</div>
            )}
          </>
        );
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      width: 160,
    },
  ];

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
              onClick={() => {
                deleteUser(params.row.id)
                  .then(() => {
                    console.log("deleted");
                  })
                  .catch(() => {
                    console.log("not deleted");
                  });
              }}
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
        rows={drivers}
        columns={driverColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DriverDatatable;

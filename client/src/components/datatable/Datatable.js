import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/userContext";

const DriverDatatable = ({ drivers }) => {
  const { deleteUser } = useAuth();

  const disableColumnBehaviour = {
    sortable: false,
    filterable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    disableColumnSelector: true,
  };

  const driverColumns = [
    {
      field: "driver",
      headerName: "Driver",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellWithImg" style={{ textTransform: "capitalize" }}>
            {`${params.row.firstName}  ${params.row.lastName}`}
          </div>
        );
      },
      ...disableColumnBehaviour,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      ...disableColumnBehaviour,
    },

    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      ...disableColumnBehaviour,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
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
      ...disableColumnBehaviour,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      width: 160,
      ...disableColumnBehaviour,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
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
      ...disableColumnBehaviour,
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
        disableSelectionOnClick
      />
    </div>
  );
};

export default DriverDatatable;

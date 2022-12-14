import "./bugstable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import database from "../../firebase/database";

const bugColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 220,
  },
  {
    field: "email",
    headerName: "User",
    width: 250,
  },

  {
    field: "Status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.Status === "False" && (
            <div className={`cellWithStatus flagged`}>unresolved</div>
          )}
          {params.row.Status === "True" && (
            <div className={`cellWithStatus clear`}>resolved</div>
          )}
        </>
      );
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 200,
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
          {/* <Link
            to={`/drivers/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="viewButton">View</div>
          </Link> */}
          {params.row.Status === "True" && (
            <div
              className="deleteButton"
              onClick={() => database.updateBugStatus(params.row.id, "False")}
            >
              Unresolve
            </div>
          )}
          {params.row.Status === "False" && (
            <div
              className="successButton"
              onClick={() => database.updateBugStatus(params.row.id, "True")}
            >
              Resolve
            </div>
          )}
        </div>
      );
    },
  },
];

const BugsTable = ({ bugs }) => {
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={bugs}
        columns={bugColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default BugsTable;

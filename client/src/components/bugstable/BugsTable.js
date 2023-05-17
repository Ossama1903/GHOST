import "./bugstable.scss";
import { DataGrid } from "@mui/x-data-grid";
import database from "../../firebase/database";

const bugColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "userId",
    headerName: "User",
    width: 300,
  },

  {
    field: "Status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.isApproved === false && (
            <div className={`cellWithStatus flagged`}>Unapproved</div>
          )}
          {params.row.isApproved === true && (
            <div className={`cellWithStatus clear`}>Approved</div>
          )}
        </>
      );
    },
  },
  {
    field: "time",
    headerName: "Time",
    width: 300,
    renderCell: (params) => {
      return (
        <>
          <div>{`${params.row.time.split(" ")[1]} ${
            params.row.time.split(" ")[2]
          }, ${params.row.time.split(" ")[3]}`}</div>
        </>
      );
    },
  },
];

const actionColumn = [
  {
    field: "action",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          {params.row.isApproved === true && (
            <div
              className="deleteButton"
              onClick={() => database.updateAlertStatus(params.row.id, false)}
            >
              Unapprove
            </div>
          )}
          {params.row.isApproved === false && (
            <div
              className="successButton"
              onClick={() => database.updateAlertStatus(params.row.id, true)}
            >
              Approve
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
        disableSelectionOnClick
      />
    </div>
  );
};

export default BugsTable;

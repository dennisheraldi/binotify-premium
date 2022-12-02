import { useState } from "preact/hooks";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns, loading, sx, rowID}) => {
    const [pageSize, setPageSize] = useState(5);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            getRowId={rowID}
        />
    );
};

export default DataTable;

import { useEffect, useMemo, useState } from "preact/hooks";
import DataTable from "../common/DataTable/DataTable";
import UserActions from "./UserActions";
import { getUsers } from "../../actions/users";
import { useValue } from "../../context/ContextProvider";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const userTableStyles = {
    height: "375px",
    width: "100%",
    margin: "auto",
    display: "flex",
};

const UserTable = () => {
    const {
        state: { users },
        dispatch,
    } = useValue();

    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        if (users.length === 0) getUsers(dispatch);
    }, []);

    const columns = useMemo(
        () => [
            { field: "creator_id", headerName: "creatorID", width: 200 },
            { field: "subscriber_id", headerName: "subscriberId", width: 200 },
            { field: "status", headerName: "Status", width: 150 },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 250,
                cellClassName: "actions",
                getActions: ({ row }) => {
                    return [
                        <>
                            <Button
                                onClick={() => {
                                    confirm(
                                        "Apakah anda yakin menerima permintaan subscription ini?"
                                    );
                                }}
                                startIcon={<CheckIcon />}
                            >
                                Terima
                            </Button>
                        </>,
                        <Button
                            color="error"
                            onClick={() => {
                                confirm(
                                    "Apakah anda yakin menolak permintaan subscription ini?"
                                );
                            }}
                            startIcon={<ClearIcon />}
                        >
                            Tolak
                        </Button>,
                    ];
                },
            },
        ],
        []
    );

    const subscriber = [
        {
            creator_id: "1",
            subscriber_id: "2",
            status: "PENDING",
        },
        {
            creator_id: "2",
            subscriber_id: "3",
            status: "PENDING",
        },
    ];

    return (
        <DataTable
            rows={subscriber}
            columns={columns}
            loading={!subscriber.length}
            sx={userTableStyles}
            rowId={(row) => row.creator_id}
        />
    );
};

export default UserTable;

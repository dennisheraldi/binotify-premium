import { useEffect, useMemo, useState } from "preact/hooks";
import DataTable from "../common/DataTable/DataTable";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useValue } from "../../context/ContextProvider";
import { API } from "../../context/API";

const userTableStyles = {
    height: "375px",
    width: "100%",
    margin: "auto",
    display: "flex",
};

const UserTable = () => {
    const {
        state: { loading },
        dispatch,
    } = useValue();
    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(false);

    const getSubscription = () => {
      dispatch({ type: "START_LOADING" });
       API.get("/subscriptions")
      .then((response) => { 
        console.log(response.data);
        setUsers(response.data.result);
        dispatch({ type: "STOP_LOADING" });
      })
      .catch((error) => { 
        console.log(error);
        dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: "Gagal di proses" } });
      });
  };

    const updateStatus = (creator_id, subscriber_id, isApproved) => {
        API.put(`/subscriptions/approve`, {
            subscriber_id, 
            creator_id,
            isApproved,
        })
        .then(() => {
          setSuccess(true);
          dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'success', message: "Berhasil dikirim" } })
        }) 
        .catch((err) => {
          dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: "Gagal dikirim" } });
          console.error(err);
        });
        
    };

    useEffect(() => {
        getSubscription();
    }, []);

    useEffect(() => {
      getSubscription();
      setSuccess(false);
    }, [success]);

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
                getActions: ({ ...params }) => {
                    return [
                        <>
                            <Button
                                onClick={() => {
                                  if (
                                    confirm(
                                        "Apakah anda yakin menerima permintaan subscription ini?"
                                    )
                                  )
                                  console.log(params);
                                    updateStatus(params.row.creator_id, params.row.subscriber_id, true);
                                }}
                                startIcon={<CheckIcon />}
                            >
                                Terima
                            </Button>
                        </>,
                        <Button
                            color="error"
                            onClick={() => {
                              if (
                                confirm(
                                    "Apakah anda yakin menolak permintaan subscription ini?"
                                )
                                )
                                updateStatus(params.row.creator_id, params.row.subscriber_id, false);
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

    return (
        <DataTable
            rows={users}
            columns={columns}
            loading={loading}
            sx={userTableStyles}
            rowID={(row) => `${row.subscriber_id} ${row.creator_id}`}
        />
    );
};

export default UserTable;

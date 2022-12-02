import { useEffect, useMemo, useState } from "preact/hooks";
import DataTable from "../common/DataTable/DataTable";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useValue } from "../../context/ContextProvider";
import Loading from "../common/Loading/Loading";
import { setEnvironmentData } from "worker_threads";

const userTableStyles = {
    height: "375px",
    width: "100%",
    margin: "auto",
    display: "flex",
};

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InBlbnlhbnlpMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBlbnlhbnlpMSIsIm5hbWUiOiJwZW55YW55aTEiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjY5OTAwNzA4fQ.joGNzTgOWr3DTsV_-y0mwApkyJMe3ItLazoN1YVK52U";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8002/api",
    timeout: 10000,
    headers: { Authorization: `Bearer ${token}` },
});

const UserTable = () => {
  const {
    state: { loading },
    dispatch,
  } = useValue();
    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(false);

    const getSubscription = async () => {
      dispatch({ type: "START_LOADING" });
       await axiosInstance.get("/subscriptions")
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

    const updateStatus = async (creator_id, subscriber_id, isApproved) => {
        await axiosInstance.put(`/subscriptions/approve`, {
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
            rows={users}
            columns={columns}
            loading={loading}
            sx={userTableStyles}
            rowID={(row) => `${row.subscriber_id} ${row.creator_id}`}
        />
    );
};

export default UserTable;

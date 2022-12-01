import { useEffect, useState, useMemo, useRef } from "preact/hooks";
import DataTable from "../common/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";

//Setup Axios
// Sample token
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InNpbmdlcjFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzaW5nZXIxIiwibmFtZSI6InNpbmdlciAxIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2OTgzNDgyMX0.ohKhj20QspLcJ8GCTjDdWwFMXE2Fwc_nfeMZMeqo3Uo";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
});

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

import { Stack } from "@mui/system";

const example_songs = [
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 1,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 2,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 3,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 4,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 5,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 6,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 7,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 8,
    },
    {
        judul: "My New Song 1 Reborn",
        audio_path: "public/audio/My New Song Reborn.mp3",
        song_id: 9,
    },
];

const songTableStyles = {
    height: "375px",
    width: "100%",
    margin: "auto",
};

// MUI CRUD Table

const SongTable = () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [songs, setsongs] = useState([]);

    const valueRef = useRef("");
    const [file, setFile] = useState(null);

    const editJudulRef = useRef("");
    const [editfile, setEditFile] = useState(null);
    const [editValue, setEditValue] = useState({});

    const handleOpen = () => setOpen(true);

    const handleOpenEdit = (row) => {
        setOpenEdit(true);
        setEditValue(row);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleCloseEdit = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenEdit(false);
    };

    const handleAddSong = async (event) => {
        const data = new FormData();

        data.append("file", file);

        // Transfer data to server
        await axiosInstance
            .post("/songs/upload", data)
            .then(async (res) => {
                await axiosInstance.post("/songs", {
                    judul: valueRef.current.value,
                    audio_path: "public/audio/" + res.data.filename,
                });
            })
            .catch((err) => {
                console.error(err);
            });
        getSongs();
        handleClose();
    };

    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onInputEditChange = (event) => {
        setEditFile(event.target.files[0]);
    };

    const onJudulEditChange = (event) => {
        setEditValue({ ...editValue, judul: event.target.value });
    };

    const handleEditSong = async (oldvalue) => {
        const data = new FormData();

        data.append("file", editfile);
        //Check parameter successfully passed
        console.log(oldvalue);
        console.log(editJudulRef.current.value);

        // Transfer editted data to server
        // If file is not changed, only update judul
        if (editfile == null) {
            await axiosInstance
                .put("/songs/" + oldvalue.song_id, {
                    judul: editJudulRef.current.value,
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            await axiosInstance
                .post("/songs/upload", data)
                .then(async (res) => {
                    await axiosInstance.put("/songs/" + oldvalue.song_id, {
                        judul: editJudulRef.current.value,
                        audio_path: "public/audio/" + res.data.filename,
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        getSongs();
        handleCloseEdit();
    };

    const handleDeleteClick = async (id) => {
        try {
            await axiosInstance.delete(`/songs/${id}`);
            getSongs();
        } catch (error) {
            console.log(error);
        }
    };

    const columns = useMemo(
        () => [
            { field: "song_id", headerName: "ID Lagu", width: 150 },
            { field: "judul", headerName: "Judul", width: 300 },
            { field: "audio_path", headerName: "Audio Path", width: 400 },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 300,
                cellClassName: "actions",
                getActions: ({ row }) => {
                    return [
                        <>
                            <Button
                                onClick={() => {
                                    handleOpenEdit(row);
                                }}
                            >
                                <EditIcon /> Edit
                            </Button>
                        </>,
                        <Button
                            color="error"
                            onClick={() => {
                                if (
                                    confirm(
                                        "Apakah anda yakin menghapus lagu ini?"
                                    )
                                )
                                    handleDeleteClick(row.song_id);
                            }}
                        >
                            <DeleteIcon /> Delete
                        </Button>,
                    ];
                },
            },
        ],
        []
    );

    const getSongs = async () => {
        // Fetch songs from API with axios
        const response = await axiosInstance.get("/songs");
        setsongs(response.data);
    };

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4" gutterBottom></Typography>
                <Button variant="contained" onClick={handleOpen}>
                    + Tambah Lagu
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Menambahkan Lagu</DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="judul"
                            label="Judul Lagu"
                            type="text"
                            fullWidth
                            variant="outlined"
                            inputRef={valueRef}
                            required
                        />
                        <label for="file">
                            Pilih File: <br></br>
                        </label>
                        <input type="file" onChange={onInputChange} required />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Batal</Button>
                        <Button onClick={handleAddSong}>Tambah</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Mengedit Lagu</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="editjudul"
                        label="Judul Lagu"
                        type="text"
                        fullWidth
                        variant="outlined"
                        inputRef={editJudulRef}
                        onChange={onJudulEditChange}
                        required
                        value={editValue.judul}
                    />
                    <label for="file">
                        Pilih File: <br></br>
                    </label>
                    <input type="file" onChange={onInputEditChange} required />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Batal</Button>
                    <Button onClick={() => handleEditSong(editValue)}>
                        Simpan Edit
                    </Button>
                </DialogActions>
            </Dialog>
            <DataTable
                rows={songs}
                columns={columns}
                loading={!songs.length}
                sx={songTableStyles}
                rowId={(row) => row.song_id}
            />
        </>
    );
};

export default SongTable;

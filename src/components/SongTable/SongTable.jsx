import { useEffect, useState, useMemo } from "preact/hooks";
import DataTable from "../common/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
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
} from "@mui/material";

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

    const [songs, setsongs] = useState([]);

    const handleEditClick = (id) => (event) => {};

    const handleDeleteClick = (id) => (event) => {};

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const columns = useMemo(
        () => [
            { field: "song_id", headerName: "ID Lagu", width: 75 },
            { field: "judul", headerName: "Judul", width: 300 },
            { field: "audio_path", headerName: "Audio Path", width: 400 },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 200,
                cellClassName: "actions",
                getActions: ({ song_id }) => {
                    return [
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
                                    variant="standard"
                                />
                                <label for="file">
                                    Pilih File: <br></br>
                                </label>
                                <input type="file" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Batal</Button>
                                <Button onClick={handleClose}>Tambah</Button>
                            </DialogActions>
                        </Dialog>,
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleOpen}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(song_id)}
                            color="inherit"
                        />,
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
        <DataTable
            rows={songs}
            columns={columns}
            loading={!songs.length}
            sx={songTableStyles}
            rowId={(row) => row.song_id}
        />
    );
};

export default SongTable;

import { useState, useEffect } from "preact/hooks";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import GridWrapper from "../components/common/GridWrapper/GridWrapper";
import BasicCard from "../components/common/BasicCard/BasicCard";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SongTable from "../components/SongTable/SongTable";

// components

// sections

// data

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function Song() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const title = "Kelola Lagu";

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Grid container>
                <Header title={title} />
                <GridWrapper>
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
                        </Dialog>
                    </Stack>
                    <BasicCard
                        content={<SongTable onError={() => setOpen(true)} />}
                    />
                </GridWrapper>
            </Grid>
        </>
    );
}

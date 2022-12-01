import { useState, useEffect, useRef } from "preact/hooks";
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
import axios from "axios";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InNpbmdlcjFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzaW5nZXIxIiwibmFtZSI6InNpbmdlciAxIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2OTgzNDgyMX0.ohKhj20QspLcJ8GCTjDdWwFMXE2Fwc_nfeMZMeqo3Uo";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
});

export function Song() {
    const title = "Kelola Lagu";

    return (
        <>
            <Grid container>
                <Header title={title} />
                <GridWrapper>
                    <BasicCard
                        content={<SongTable onError={() => setOpen(true)} />}
                    />
                </GridWrapper>
            </Grid>
        </>
    );
}

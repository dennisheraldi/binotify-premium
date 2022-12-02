import { useState, useEffect, useRef } from "preact/hooks";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import GridWrapper from "../components/common/GridWrapper/GridWrapper";
import BasicCard from "../components/common/BasicCard/BasicCard";

import SongTable from "../components/SongTable/SongTable";

export function Song() {
    const title = "Kelola Lagu";

    return (
        <>
            <Grid container>
                <Header title={title} />
                <GridWrapper>
                    <BasicCard style={{ width: "65%", margin: "auto" }}>
                        <SongTable onError={() => setOpen(true)} />
                    </BasicCard>
                </GridWrapper>
            </Grid>
        </>
    );
}

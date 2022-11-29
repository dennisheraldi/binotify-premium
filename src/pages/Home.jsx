import {useState, useEffect} from 'preact/hooks'
import Grid from '@mui/material/Grid'
import Header from '../components/Header/Header'
import GridWrapper from '../components/common/GridWrapper/GridWrapper'
import BasicCard from '../components/common/BasicCard/BasicCard'
import UserTable from '../components/UserTable/UserTable'
import BasicSnackbar from '../components/common/BasicSnackbar/BasicSnackbar'

export function Home() {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const title = 'List Permintaan Subscription'
    return (
        <Grid container>
            <Header title={title} />
            <GridWrapper>
                <BasicCard 
                content={<UserTable onError={() => setOpen(true)} />}
                />
                <BasicSnackbar
                open={open}
                severity="error"
                message="Tidak dapat mengambil data"
                onClose={handleClose}
                />
            </GridWrapper>
        </Grid>
    )
}
import {useState, useEffect} from 'preact/hooks'
import Grid from '@mui/material/Grid'
import Header from '../components/Header/Header'
import GridWrapper from '../components/common/GridWrapper/GridWrapper'
import BasicCard from '../components/common/BasicCard/BasicCard'
import UserTable from '../components/UserTable/UserTable'
import BasicSnackbar from '../components/common/BasicSnackbar/BasicSnackbar'

export function Subscriber() {

    const title = 'List Permintaan Subscription'
    return (
        <Grid container>
            <Header title={title} />
            <GridWrapper>
                <BasicCard 
                    style={{width: 900, margin: 'auto'}}>
                    <UserTable />
                </BasicCard>
                <BasicSnackbar
                />
            </GridWrapper>
        </Grid>
    )
}
import {useState, useEffect} from 'preact/hooks'
import Grid from '@mui/material/Grid'
import Header from '../components/Header/Header'

export function Home() {
    const title = 'List Permintaan Subscription'
    return (
        <Grid container>
            <Header title={title} />
        </Grid>
    )
}
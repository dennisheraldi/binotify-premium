import Grid from '@mui/material/Grid';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ style, children }) => {

    return (
        <Grid item xs={12} sx={{...gridWrapperStyles, ...style}}>
            {children}
        </Grid>
    )
}

export default GridWrapper

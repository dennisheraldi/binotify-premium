import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { headerStyles } from './styles';
import CommonButton from '../common/CommonButton/CommonButton'

const Header = ({ title }) => {
    return (
        <Box sx={headerStyles.wrapper}>
            <Box sx={headerStyles.topRow}>
                <Box sx={headerStyles.title}>
                    <Typography
                        variant="h1"
                        color="white"
                    >
                        Binofity Premium
                    </Typography>
                </Box>
                <Box sx={headerStyles.rightSide}>
                    <CommonButton
                        sx={headerStyles.webButton}
                        variant="outlined"
                    >
                        Log Out
                    </CommonButton>
                </Box>
            </Box>
            <Box sx={headerStyles.middleRow}>
                <Typography
                    variant="h1"
                    color="white"
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    )
}

export default Header

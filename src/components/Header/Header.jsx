import CommonButton from '../common/CommonButton/CommonButton'
import NotificationBell from '../common/NotificationBell/NotificationBell'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import { headerStyles } from './styles';

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
                    <NotificationBell
                        iconColor="white"
                    />
                    <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
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

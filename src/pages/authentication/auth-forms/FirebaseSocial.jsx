// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";

// // assets
// import Google from 'assets/images/icons/google.svg';
// import Twitter from 'assets/images/icons/twitter.svg';
// import Facebook from 'assets/images/icons/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const googleHandler = async () => {
        // login || singup
    };

    const twitterHandler = async () => {
        // login || singup
    };

    const facebookHandler = async () => {
        // login || singup
    };

    return (
        <Stack
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            justifyContent={matchDownSM ? "space-around" : "space-between"}
            sx={{
                "& .MuiButton-startIcon": {
                    mr: matchDownSM ? 0 : 1,
                    ml: matchDownSM ? 0 : -0.5,
                },
            }}
        >
            <Button>Google</Button>
            <Button>Twitter</Button>
            <Button>Facebook</Button>
        </Stack>
    );
};

export default FirebaseSocial;

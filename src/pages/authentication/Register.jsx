import { Link } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import FirebaseRegister from "./auth-forms/AuthRegister";
import AuthWrapper from "./AuthWrapper";

// ================================|| REGISTER ||================================ //

export function Register() {
    return (
        <AuthWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Register</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FirebaseRegister />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}

import Grid from "@mui/material/Grid";
import GridWrapper from "../components/common/GridWrapper/GridWrapper";
import BasicCard from "../components/common/BasicCard/BasicCard";
import CommonButton from "../components/common/CommonButton/CommonButton";
import { Alert, Box, Collapse, TextField, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import { useAuth } from "../context/Auth";


export function Login() {
    const {authMethod: auth, _} = useAuth();
    const [sending, isSending] = useState(false);
    const [alert, setAlert] = useState("");
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlert("");
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isSending(true);
        try {
            await auth.login(data.username, data.password);
        } catch (err) {
            setAlert(err.response?.data ? err.response.data.message : err.message);
            console.log(err);
        } finally {
            isSending(false);
        }
    };

    return (
        <>
            <Grid container>
                <GridWrapper>
                    <BasicCard style={{textAlign: "center", maxWidth: "500px", margin: "auto"}}>
                        <Typography variant="h4" fontWeight={600}>
                            Login
                        </Typography>
                        <Box
                            style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                required
                                label="Username"
                                name="username"
                                value={data.username}
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                label="Password"
                                name="password"
                                type="password"
                                value={data.password}
                                margin="dense"
                                onChange={handleChange}
                            />
                            <Collapse in={alert !== ""}>
                                <Alert severity="error" style={{marginTop: "10px"}}>
                                    {alert}
                                </Alert>
                            </Collapse>
                            <CommonButton
                                type="submit"
                                variant="contained"
                                disabled={sending}
                            >
                                Login
                            </CommonButton>
                        </Box>
                    </BasicCard>
                </GridWrapper>
            </Grid>
        </>
    );
}
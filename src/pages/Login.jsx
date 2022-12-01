import Grid from "@mui/material/Grid";
import GridWrapper from "../components/common/GridWrapper/GridWrapper";
import BasicCard from "../components/common/BasicCard/BasicCard";
import CommonButton from "../components/common/CommonButton/CommonButton";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "preact/hooks";


export function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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
                                value={data.password}
                                margin="dense" 
                                onChange={handleChange}
                            />
                            <CommonButton
                                type="submit"
                                variant="contained"
                                onSubmit={handleSubmit}
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
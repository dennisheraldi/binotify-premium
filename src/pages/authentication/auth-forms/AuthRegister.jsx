import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "../../../components/@extended/AnimateButton";
import {
    strengthColor,
    strengthIndicator,
} from "../../../utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

//axios
import axios from "../../../api/axios";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword("");
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    name: "Artist",
                    password: "",
                    confirmPassword: "",
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .max(255)
                        .required("Username is required"),
                    email: Yup.string()
                        .email("Must be a valid email")
                        .max(255)
                        .required("Email is required"),
                    password: Yup.string()
                        .max(255)
                        .required("Password is required"),
                    confirmPassword: Yup.string().oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                    ),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        console.log(values);
                        const response = await axios.post("users", {
                            username: values.username,
                            email: values.email,
                            name: values.name,
                            password: values.password,
                            isAdmin: false,
                        });
                        console.log(response);
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">
                                        Name
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.name && errors.name
                                        )}
                                        id="name-signup"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        inputProps={{}}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText
                                            error
                                            id="helper-text-name-signup"
                                        >
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-signup">
                                        Username*
                                    </InputLabel>
                                    <OutlinedInput
                                        id="username-login"
                                        type="username"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="User"
                                        fullWidth
                                        error={Boolean(
                                            touched.username && errors.username
                                        )}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText
                                            error
                                            id="helper-text-username-signup"
                                        >
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">
                                        Email Address*
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.email && errors.email
                                        )}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@name.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText
                                            error
                                            id="helper-text-email-signup"
                                        >
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.password && errors.password
                                        )}
                                        id="password-signup"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText
                                            error
                                            id="helper-text-password-signup"
                                        >
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Box
                                                sx={{
                                                    bgcolor: level?.color,
                                                    width: 85,
                                                    height: 8,
                                                    borderRadius: "7px",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="subtitle1"
                                                fontSize="0.75rem"
                                            >
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.confirmPassword &&
                                                errors.confirmPassword
                                        )}
                                        id="confirm-password-signup"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowConfirmPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownConfirmPassword
                                                    }
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword &&
                                        errors.confirmPassword && (
                                            <FormHelperText
                                                error
                                                id="helper-text-password-signup"
                                            >
                                                {errors.confirmPassword}
                                            </FormHelperText>
                                        )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Account
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Grid mt={2}>
                <Divider></Divider>
            </Grid>
        </>
    );
};

export default AuthRegister;

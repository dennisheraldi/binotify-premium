import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 8.5,
                    textTransform: 'none',
                    '&.MuiButton-contained': {
                        backgroundColor: '#1ed760',
                        '&:hover': {
                            backgroundColor: '#43e57d'
                        },
                    },
                    '&.MuiButton-outlined': {
                        color: "#fff",
                        borderColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        },
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.7rem',
                },
            },
        },
    },
    palette: {
        white: {
            main: '#ffffff',
        },
    },
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '0.5px',
            textTransform: 'capitalize',
        },
        fontFamily: ["circular std book"],
    },
  });

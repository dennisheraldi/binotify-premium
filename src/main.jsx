import { render } from 'preact'
import { RouterProvider } from 'react-router-dom'
import '../index.css'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './components/Theme/Theme'
import router from './router'
import ContextProvider from './context/ContextProvider';
import { AuthProvider } from './context/Auth'

render(
    <AuthProvider>
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </ContextProvider>
    </AuthProvider>,
    document.getElementById('app'))

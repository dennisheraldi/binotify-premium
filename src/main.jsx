import { render } from 'preact'
import { RouterProvider } from 'react-router-dom'
import '../index.css'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './components/Theme/Theme'
import router from './router'

render(<ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>,
    document.getElementById('app'))

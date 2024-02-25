import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  )
}

export default App

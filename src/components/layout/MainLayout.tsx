import { Box, CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Box
      display={'flex'}
      minHeight={'100vh'}
      bgcolor={'white'}
      minWidth={'100vw'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Suspense fallback={<CircularProgress></CircularProgress>}>
        <Outlet></Outlet>
      </Suspense>
    </Box>
  )
}

export default MainLayout

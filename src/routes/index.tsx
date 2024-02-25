import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import MainLayout from '~/components/layout/MainLayout'
import NotFound from '~/components/specialPage/NotFound'
import ServerError from '~/components/specialPage/ServerError'
import PATH from '~/constants/path'

const FlowChart = React.lazy(() => import('~/features/campaign/pages/FlowChart'))

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout></MainLayout>,
    errorElement: <Navigate to={PATH.SERVER_ERROR} />,
    children: [
      { path: '/', element: <FlowChart></FlowChart> },
      { path: '*', element: <Navigate to={PATH.NOT_FOUND} /> }
    ]
  },
  { path: PATH.SERVER_ERROR, element: <ServerError /> },
  { path: PATH.NOT_FOUND, element: <NotFound /> }
])

export default router

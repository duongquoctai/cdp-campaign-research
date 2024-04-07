import { Box } from '@mui/material'
import React from 'react'

const NodeWrapper = ({ children }: { children: React.ReactNode | React.ReactElement }) => {
  return <Box sx={{ minWidth: 400 }}> {children}</Box>
}

export default NodeWrapper

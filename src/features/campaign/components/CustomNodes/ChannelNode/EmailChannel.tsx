import { Box, Card, TextField } from '@mui/material'
import React from 'react'

const EmailChannel = () => {
  return (
    <div>
      <Card>
        <Box sx={{ padding: 4 }}>
          <Box>Email</Box>
          <Box mt={2}>
            <TextField label='account' />
          </Box>

          <Box mt={2}>
            <TextField label='template' />
          </Box>

          <Box mt={2}>
            <TextField label='token' />
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default EmailChannel

import { Box, Card, TextField } from '@mui/material'
import React from 'react'
import ButtonDeleteNode from '../../ButtonDeleteNode'
import NodeWrapper from '../../NodeWrapper'

const SMSChannel = () => {
  return (
    <NodeWrapper>
      <Card>
        <Box sx={{ padding: 4 }}>
          <ButtonDeleteNode />
          <Box>SMS</Box>
          <Box mt={2}>
            <TextField fullWidth label='account' />
          </Box>

          <Box mt={2}>
            <TextField fullWidth label='template' />
          </Box>

          <Box mt={2}>
            <TextField label='token' fullWidth />
          </Box>
        </Box>
      </Card>
    </NodeWrapper>
  )
}

export default SMSChannel

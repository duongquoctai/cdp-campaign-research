import { Box, Card, Collapse, TextField } from '@mui/material'
import React from 'react'
import ButtonDeleteNode from '../../ButtonDeleteNode'

const EmailChannel = () => {
  const [collapse, setCollapse] = React.useState(true)
  return (
    <div>
      <Card>
        <Box sx={{ padding: 4 }}>
          <ButtonDeleteNode />
          <Box onClick={() => setCollapse(!collapse)}>Email</Box>

          <Collapse unmountOnExit in={collapse}>
            <Box mt={2}>
              <TextField label='account' />
            </Box>

            <Box mt={2}>
              <TextField label='template' />
            </Box>

            <Box mt={2}>
              <TextField label='token' />
            </Box>
          </Collapse>
        </Box>
      </Card>
    </div>
  )
}

export default EmailChannel

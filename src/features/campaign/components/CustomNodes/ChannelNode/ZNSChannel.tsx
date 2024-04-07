import { Box, Card, Collapse, TextField } from '@mui/material'
import React, { useContext } from 'react'
import ButtonDeleteNode from '../../ButtonDeleteNode'
import { NodeContext } from 'react-flow-builder'
import NodeWrapper from '../../NodeWrapper'

const ZNSChannel = () => {
  const node = useContext(NodeContext)
  const [collapse, setCollapse] = React.useState(true)
  return (
    <NodeWrapper>
      <Card>
        <Box sx={{ padding: 4 }}>
          <ButtonDeleteNode />
          <Box onClick={() => setCollapse(!collapse)}>ZNS</Box>

          <Collapse unmountOnExit in={collapse}>
            <Box mt={2}>
              <TextField fullWidth label='account' />
            </Box>

            <Box mt={2}>
              <TextField fullWidth label='template' />
            </Box>

            <Box mt={2}>
              <TextField fullWidth label='token' />
            </Box>
          </Collapse>
        </Box>
      </Card>
    </NodeWrapper>
  )
}

export default ZNSChannel

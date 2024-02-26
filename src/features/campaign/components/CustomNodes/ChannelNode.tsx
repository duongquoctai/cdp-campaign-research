import { Icon } from '@iconify/react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { NodeContext, useAction } from 'react-flow-builder'

const ChannelNode = () => {
  const node = useContext(NodeContext)
  const { removeNode } = useAction()
  // const { saveDrawer } = useDrawer()

  // const { selectedNode, setSelectedNode } = useContext(BuilderContext)

  // console.log('selectedNode :>> ', selectedNode)

  //State
  const [isExpand, setIsExpand] = useState(false)
  return (
    <Paper
      sx={{
        width: 200,
        p: 2,
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        cursor: 'pointer'
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
        sx={{ minWidth: 0 }}
        justifyContent={'space-between'}
        onClick={() => setIsExpand((state) => !state)}
      >
        <Icon icon='mdi:ads' />
        <Typography noWrap fontWeight={600} color='grey.900' maxWidth={220}>
          {node.name}
        </Typography>
        <Button onClick={() => removeNode()}>Remove</Button>
        {/* <Button
          onClick={() => {
            setSelectedNode(node)
            // saveDrawer({ test: Math.random() })
          }}
        >
          Save
        </Button> */}
      </Stack>
      {isExpand && (
        <Stack justifyContent={'center'} alignItems={'center'} height={200}>
          Config
        </Stack>
      )}
    </Paper>
  )
}

export default ChannelNode

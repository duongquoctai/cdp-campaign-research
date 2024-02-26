import { Icon } from '@iconify/react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { NodeContext, useAction } from 'react-flow-builder'

const BranchNode = () => {
  const node = useContext(NodeContext)
  const { removeNode } = useAction()

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
      onClick={() => setIsExpand((state) => !state)}
    >
      <Stack direction='row' alignItems='center' spacing={2} sx={{ minWidth: 0 }} justifyContent={'space-between'}>
        <Icon icon='fluent:branch-24-regular' />
        <Typography noWrap fontWeight={600} color='grey.900' maxWidth={220}>
          {node.name}
        </Typography>
        <Button onClick={() => removeNode(node)}>Remove</Button>
      </Stack>
      {isExpand && (
        <Stack justifyContent={'center'} alignItems={'center'} height={200}>
          Config
        </Stack>
      )}
    </Paper>
  )
}

export default BranchNode

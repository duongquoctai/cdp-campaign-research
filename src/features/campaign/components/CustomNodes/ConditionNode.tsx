import { Icon } from '@iconify/react'
import { Button, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { NodeContext, useAction } from 'react-flow-builder'

const ConditionNode = () => {
  const node = useContext(NodeContext)
  const { removeNode } = useAction()
  return (
    <div
      style={{
        cursor: 'auto'
      }}
    >
      <Stack
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        className='qq-test-flag'
        sx={{
          minWidth: '94px',
          width: 'fit-content',
          height: '30px',
          padding: '4px 10px',
          boxShadow: 'none',
          borderRadius: '16px',
          border: '1.5px solid #039855',
          background: '#FFFFFF'
        }}
      >
        <Icon icon='ph:funnel-bold' fontSize={13} width={12} height={12} color='#039855' />
        <Typography
          sx={{
            color: '#039855',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '20px',
            marginLeft: '4px',
            whiteSpace: 'nowrap'
          }}
        >
          {node.name}
        </Typography>
        <Button onClick={() => removeNode()}>Remove</Button>
      </Stack>
    </div>
  )
}

export default ConditionNode

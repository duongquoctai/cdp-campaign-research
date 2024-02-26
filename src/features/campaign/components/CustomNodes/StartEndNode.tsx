import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { NodeContext } from 'react-flow-builder'

export const StartEndNode = () => {
  const node = useContext(NodeContext)

  return (
    <div
      style={{
        cursor: 'auto'
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '78px',
          bgcolor: 'grey.300',
          color: 'grey.700',
          borderRadius: '16px',
          padding: '2px 10px',
          height: '24px',
          boxShadow: 'none'
        }}
      >
        <Typography
          sx={{
            color: 'grey.700',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          {node.name}
        </Typography>
      </Stack>
    </div>
  )
}

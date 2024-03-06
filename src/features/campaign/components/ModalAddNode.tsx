import { Icon } from '@iconify/react'
import { MenuItem, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { IAddableComponent, NodeContext, useAction } from 'react-flow-builder'
import { useCampaignStore } from '../store/campagin'
import { addMultipleBranch } from '../utils/FlowChart'

const nodeTypes = [
  { type: 'channelNode', title: 'Channel Node', icon: <Icon icon='mdi:ads' /> },
  { type: 'branch', title: 'Branch', icon: <Icon icon='fluent:branch-24-regular' /> }
]
const ModalAddNode = (props: IAddableComponent) => {
  const { add } = props
  const { addNode } = useAction()
  const node = useContext(NodeContext)
  const { nodes, setNodes } = useCampaignStore()

  const handleAddNode = (type: string) => {
    if (type === 'branch') {
      const newNodes = addMultipleBranch(nodes, node)
      setNodes(newNodes)
    } else {
      addNode(node, type)
    }
  }

  return (
    <>
      {nodeTypes.map((e, i) => (
        <MenuItem
          key={e.title}
          sx={{
            p: '6px 8px',
            mb: i === nodeTypes.length - 1 ? 0 : 0.5,
            ':hover': {
              bgcolor: 'grey.100'
            }
          }}
          onClick={() => handleAddNode(e.type)}
        >
          <Stack direction='row' spacing={1} alignItems='center'>
            <Stack
              sx={{
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',

                borderRadius: 1
              }}
            >
              {e.icon}
            </Stack>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'grey.900'
              }}
            >
              {e.title}
            </Typography>
          </Stack>
        </MenuItem>
      ))}
    </>
  )
}

export default ModalAddNode

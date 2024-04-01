import { Icon } from '@iconify/react'
import { MenuItem, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { IAddableComponent, NodeContext, useAction } from 'react-flow-builder'
import { useCampaignDataStore, useCampaignStore } from '../store/campagin'
import { addMultipleBranch, addNormalNode } from '../utils/FlowChart'

const nodeTypes = [
  { type: 'channelNode', title: 'Channel Node', icon: <Icon icon='mdi:ads' /> },
  { type: 'branch', title: 'Branch', icon: <Icon icon='fluent:branch-24-regular' /> },
  { type: 'loop', title: 'Loop', icon: <Icon icon='fluent:branch-24-regular' /> },
  { type: 'zns', title: 'ZNS', icon: <Icon icon='fluent:branch-24-regular' /> },
  { type: 'facebook', title: 'Facebook', icon: <Icon icon='fluent:branch-24-regular' /> }
]
const ModalAddNode = (props: IAddableComponent) => {
  const node = useContext(NodeContext)
  const { addNode } = useAction()
  const { nodes, setNodes } = useCampaignStore()
  const setDataNodes = useCampaignDataStore((state) => state.setDataNodes)
  const dataNodes = useCampaignDataStore((state) => state.dataNodes)

  console.log('dataNOdes', dataNodes)

  const handleAddNode = (type: string) => {
    if (type === 'branch') {
      addMultipleBranch(nodes, node, addNode, dataNodes, setDataNodes)
    } else {
      addNormalNode(node, type, addNode, dataNodes, setDataNodes)
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

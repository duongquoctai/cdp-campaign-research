import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { deleteNode } from '../utils/FlowChart'
import { NodeContext, useAction } from 'react-flow-builder'
import { useCampaignDataStore, useCampaignStore } from '../store/campagin'

const ButtonDeleteNode = () => {
  const node = useContext(NodeContext)
  const setDataNodes = useCampaignDataStore((state) => state.setDataNodes)
  const dataNodes = useCampaignDataStore((state) => state.dataNodes)
  const { nodes, setNodes } = useCampaignStore()
  const { removeNode } = useAction()
  const handleDelete = () => {
    return
    deleteNode(node, removeNode, dataNodes, setDataNodes, nodes, setNodes)
  }
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button onClick={handleDelete}>Xóa</Button>
    </Box>
  )
}

export default ButtonDeleteNode

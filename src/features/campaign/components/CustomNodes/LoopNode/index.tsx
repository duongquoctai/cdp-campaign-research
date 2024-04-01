import { Box } from '@mui/material'
import React from 'react'
import FlowBuilder, { IRegisterNode, createUuid } from 'react-flow-builder'
import { registerNodes } from '~/features/campaign/pages/FlowChart'
import { useCampaignDataStore } from '~/features/campaign/store/campagin'
import PopoverComponent from '../../PopoverComponent'

const LoopNode = React.memo(
  (props: any) => {
    const id = props.node?.id
    const nodes = useCampaignDataStore((state) => state.dataNodes.find((n) => n.id === id)?.data.tree_nodes) || []

    return (
      <Box sx={{ padding: 10, border: '1px dashed #6b6666' }}>
        <FlowBuilder
          registerNodes={registerNodes}
          nodes={nodes}
          onChange={() => console.log('onchange in loop')}
          showPracticalBranchNode
          showPracticalBranchRemove
          PopoverComponent={PopoverComponent}
        />
      </Box>
    )
  },
  (a, b) => a?.node.id === b?.node.id
)

export default LoopNode

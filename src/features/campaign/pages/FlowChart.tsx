import { useEffect, useState } from 'react'
import FlowBuilder, { INode, IRegisterNode, createUuid, buildTreeNodes, buildFlatNodes } from 'react-flow-builder'
import { BranchNode } from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import { ConditionNode } from '../components/CustomNodes/ConditionNode'
import { DataSourceNode } from '../components/CustomNodes/DataSourceNode'
import { StartEndNode } from '../components/CustomNodes/StartEndNode'
import ModalAddNode from '../components/ModalAddNode'
import PopoverComponent from '../components/PopoverComponent'
import '../styles/FlowChart.css'
import { addEndNodes, flatNodes, recursiveUpdateNodes, removeEndNodes } from '../utils/FlowChart'
import { useCampaignDataStore, useCampaignStore } from '../store/campagin'
import FacebookChannel from '../components/CustomNodes/ChannelNode/FacebookChannel'
import ZNSChannel from '../components/CustomNodes/ChannelNode/ZNSChannel'
import EmailChannel from '../components/CustomNodes/ChannelNode/EmailChannel'
import SMSChannel from '../components/CustomNodes/ChannelNode/SMSChannel'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { dataNode } from '../types/Campagin.type'
import LoopNode from '../components/CustomNodes/LoopNode'
import { Box, Button, Collapse, Container, Stack } from '@mui/material'

export const registerNodes: IRegisterNode[] = [
  {
    type: 'dataSource',
    name: 'dataSource',
    displayComponent: DataSourceNode,
    addableNodeTypes: [],
    isStart: true
  },
  {
    type: 'start',
    name: 'Start',
    displayComponent: StartEndNode,
    addableComponent: ModalAddNode
  },
  {
    type: 'end',
    name: 'End',
    displayComponent: StartEndNode,
    isEnd: true,
    addableComponent: ModalAddNode
  },
  {
    type: 'channelNode',
    name: 'Node',
    displayComponent: ChannelNode,
    addableComponent: ModalAddNode,
    initialNodeData: {
      data: 'my channel node'
    }
  },
  {
    type: 'facebook',
    name: 'facebook',
    displayComponent: FacebookChannel,
    addableComponent: ModalAddNode
  },
  {
    type: 'zns',
    name: 'zns',
    displayComponent: ZNSChannel,
    addableComponent: ModalAddNode,
    initialNodeData: {
      id: createUuid(),
      data: 'zns'
    }
  },
  {
    type: 'email',
    name: 'email',
    displayComponent: EmailChannel,
    addableComponent: ModalAddNode,
    initialNodeData: {
      id: createUuid(),
      data: 'email'
    }
  },
  {
    type: 'sms',
    name: 'sms',
    displayComponent: SMSChannel,
    addableComponent: ModalAddNode,
    initialNodeData: {
      id: createUuid(),
      data: 'sms'
    }
  },
  {
    type: 'loop',
    name: 'Loop',
    displayComponent: LoopNode,
    addableComponent: ModalAddNode
  },
  {
    type: 'condition',
    name: 'Condition Node',
    displayComponent: ConditionNode,
    addableComponent: ModalAddNode
    // addableNodeTypes: [],
  },
  // {
  //   type: 'addable_condition',
  //   name: 'Addable condition node',
  //   // displayComponent: ConditionNode,
  //   addableComponent: ModalAddNode,
  //   // addableNodeTypes: [],
  //   initialNodeData: {
  //     data: 'my connection node'
  //   }
  // },
  {
    type: 'branch',
    name: 'Branch',
    conditionNodeType: 'condition',
    displayComponent: BranchNode,
    addableComponent: ModalAddNode,
    addConditionIcon: <div style={{ width: 2, height: 10, backgroundColor: '#999' }} />,
    addableNodeTypes: []
  }
]

const NodeForm = () => {
  const { nodes, setNodes } = useCampaignStore()
  const [collapsed, setCollapsed] = useState(false)
  // const flattenNodes = flatNodes(nodes)
  // const dataNodes = useCampaignDataStore((state) => state.dataNodes)
  // console.log('flat', flatNodes)
  const handleChange = (nodes: INode[], changeEvent: string, nodeChanged?: INode | undefined) => {
    return
    // if (nodeChanged?.type) {
    //   if (
    //     (nodeChanged.type === 'branch' && changeEvent === 'add-node__branch') ||
    //     (nodeChanged.type === 'condition' && changeEvent === 'add-node__condition')
    //   ) {
    //     setNodes(removeEndNodes(recursiveUpdateNodes(nodes, nodeChanged, changeEvent)))
    //   } else if (changeEvent === 'remove-node') {
    //     setNodes(addEndNodes(removeConditionNodes(nodes)))
    //   } else {
    //     setNodes(nodes)
    //   }
    // }
  }

  // useEffect(() => {
  //   const nodeIds: dataNode[] = flattenNodes.map((node) => {
  //     return {
  //       id: node.id,
  //       data: {
  //         user_data: {
  //           account: '',
  //           template: '',
  //           token: ''
  //         },
  //         tree_nodes: []
  //       }
  //     }
  //   })
  //   setDataNodes(nodeIds)
  // }, [flattenNodes.length])

  return (
    <Stack position='relative' height='100%' width='100%'>
      <Box position='absolute' sx={{ top: 0, left: 20, bgcolor: 'transparent', zIndex: 9 }}>
        <Button onClick={() => setCollapsed(!collapsed)}>...</Button>
        <Collapse in={collapsed}>
          <Box m={4} p={4} borderRadius={8} bgcolor='orange'>
            <ul style={{ color: 'white', fontWeight: 'bold' }}>
              <li>
                Thay đổi toàn bộ code luồng marketing hiện tại (cách lưu trữ data, tính toán các node, ...), <br />
                cần nhiều thời gian để đổi (ước lượng 2 sprints cho 4 dev).
              </li>
              <li>Lưu toàn bộ campaign và node thay vì lưu từng node như hiện tại (Thay đổi cả Backend)</li>
              <li>Khó khăn trong việc customize (UX/UI), có thể phải fork lib về để đọc code và customize.</li>
              <li>Là một lib của trung quốc nên không có cộng đồng, khó khăn trong việc tìm kiếm.</li>
            </ul>
          </Box>
        </Collapse>
      </Box>
      <FlowBuilder
        scrollByDrag
        zoomTool
        nodes={nodes}
        onChange={handleChange}
        registerNodes={registerNodes}
        showPracticalBranchNode
        showPracticalBranchRemove
        PopoverComponent={PopoverComponent}
      />
    </Stack>
  )
}

export default NodeForm

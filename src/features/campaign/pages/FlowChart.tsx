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
import { addEndNodes, flatNodes, recursiveUpdateNodes, removeConditionNodes, removeEndNodes } from '../utils/FlowChart'
import { useCampaignDataStore, useCampaignStore } from '../store/campagin'
import FacebookChannel from '../components/CustomNodes/ChannelNode/FacebookChannel'
import ZNSChannel from '../components/CustomNodes/ChannelNode/ZNSChannel'
import EmailChannel from '../components/CustomNodes/ChannelNode/EmailChannel'
import SMSChannel from '../components/CustomNodes/ChannelNode/SMSChannel'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { dataNode } from '../types/Campagin.type'
import LoopNode from '../components/CustomNodes/LoopNode'

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
    type: 'zalo',
    name: 'zalo',
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
    // displayComponent: ConditionNode,
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
  const flattenNodes = flatNodes(nodes)
  const dataNodes = useCampaignDataStore((state) => state.dataNodes)
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

  console.log('flat', flattenNodes)

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

  console.log('cay', nodes)
  console.log('data', dataNodes)

  return (
    <>
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
    </>
  )
}

export default NodeForm

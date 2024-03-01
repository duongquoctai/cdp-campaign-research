import { useEffect, useState } from 'react'
import FlowBuilder, { INode, IRegisterNode, createUuid, buildTreeNodes } from 'react-flow-builder'
import { BranchNode } from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import { ConditionNode } from '../components/CustomNodes/ConditionNode'
import { DataSourceNode } from '../components/CustomNodes/DataSourceNode'
import { StartEndNode } from '../components/CustomNodes/StartEndNode'
import ModalAddNode from '../components/ModalAddNode'
import PopoverComponent from '../components/PopoverComponent'
import '../styles/FlowChart.css'
import { addEndNodes, recursiveUpdateNodes, removeConditionNodes, removeEndNodes } from '../utils/FlowChart'
import { useCampaignStore } from '../store/campagin'
import FacebookChannel from '../components/CustomNodes/ChannelNode/FacebookChannel'
import ZNSChannel from '../components/CustomNodes/ChannelNode/ZNSChannel'
import EmailChannel from '../components/CustomNodes/ChannelNode/EmailChannel'
import SMSChannel from '../components/CustomNodes/ChannelNode/SMSChannel'

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
    addableComponent: ModalAddNode,
    initialNodeData: {
      id: createUuid(),
      data: 'facebook'
    }
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
    type: 'condition',
    name: 'Condition Node',
    // displayComponent: ConditionNode,
    addableComponent: ModalAddNode,
    addableNodeTypes: [],
    initialNodeData: {
      data: 'my connection node'
    }
  },
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

  const handleChange = (nodes: INode[], changeEvent: string, nodeChanged?: INode | undefined) => {
    return
    if (nodeChanged?.type) {
      if (
        (nodeChanged.type === 'branch' && changeEvent === 'add-node__branch') ||
        (nodeChanged.type === 'condition' && changeEvent === 'add-node__condition')
      ) {
        setNodes(removeEndNodes(recursiveUpdateNodes(nodes, nodeChanged, changeEvent)))
      } else if (changeEvent === 'remove-node') {
        setNodes(addEndNodes(removeConditionNodes(nodes)))
      } else {
        setNodes(nodes)
      }
    }
  }

  useEffect(() => {
    // if (nodes.length === 2) {
    //   setNodes((state: INode[]) => [...state, { id: createUuid(), name: 'end', type: 'end' }])
    // }
  }, [nodes])

  return (
    <>
      <FlowBuilder
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

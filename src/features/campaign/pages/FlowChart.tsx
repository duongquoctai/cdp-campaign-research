import { useEffect, useState } from 'react'
import FlowBuilder, { INode, IRegisterNode, createUuid } from 'react-flow-builder'
import { BranchNode } from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import { ConditionNode } from '../components/CustomNodes/ConditionNode'
import { DataSourceNode } from '../components/CustomNodes/DataSourceNode'
import { StartEndNode } from '../components/CustomNodes/StartEndNode'
import ModalAddNode from '../components/ModalAddNode'
import PopoverComponent from '../components/PopoverComponent'
import '../styles/FlowChart.css'
import { addEndNodes, recursiveUpdateNodes, removeConditionNodes, removeEndNodes } from '../utils/FlowChart'

const registerNodes: IRegisterNode[] = [
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
    addableComponent: ModalAddNode
  },
  {
    type: 'condition',
    name: 'Condition Node',
    displayComponent: ConditionNode,
    addableComponent: ModalAddNode,
    addableNodeTypes: []
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
  const [nodes, setNodes] = useState<INode[]>([
    { id: createUuid(), name: 'dataSource', type: 'dataSource' },
    { id: createUuid(), name: 'start', type: 'start' },
    { id: createUuid(), name: 'branch', type: 'branch' },
    { id: createUuid(), name: 'end', type: 'end' }
  ])

  const handleChange = (nodes: INode[], changeEvent: string, nodeChanged?: INode | undefined) => {
    console.clear()
    console.log(nodes, changeEvent, nodeChanged)

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
    console.log('real nodes', nodes)

    if (nodes.length === 2) {
      setNodes((state) => [...state, { id: createUuid(), name: 'end', type: 'end' }])
    }
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

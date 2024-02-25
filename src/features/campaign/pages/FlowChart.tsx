import React, { useState, useContext } from 'react'
import FlowBuilder, { NodeContext, INode, IRegisterNode } from 'react-flow-builder'
import PopoverComponent from '../components/PopoverComponent'

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext)
  return <div className='start-node'>{node.name}</div>
}

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext)
  return <div className='end-node'>{node.name}</div>
}

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext)
  return (
    <div
      className={`other-node ${node.configuring ? 'node-configuring' : ''} ${
        node.validateStatusError ? 'node-status-error' : ''
      }`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  )
}

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext)
  return (
    <div
      className={`condition-node ${
        node.configuring ? 'node-configuring' : ''
      } ${node.validateStatusError ? 'node-status-error' : ''}`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  )
}

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: 'Start Node',
    displayComponent: StartNodeDisplay,
    isStart: true
  },
  {
    type: 'end',
    name: 'End node',
    displayComponent: EndNodeDisplay,
    isEnd: true
  },
  {
    type: 'node',
    name: 'Node',
    displayComponent: NodeDisplay
  },
  {
    type: 'condition',
    name: 'Condition Node',
    displayComponent: ConditionNodeDisplay
  },
  {
    type: 'branch',
    name: 'Branch',
    conditionNodeType: 'condition',
    displayComponent: NodeDisplay
  }
]

const NodeForm = () => {
  const [nodes, setNodes] = useState<INode[]>([])

  const handleChange = (nodes: INode[]) => {
    console.log('nodes change', nodes)
    setNodes(nodes)
  }

  return (
    <>
      <FlowBuilder
        nodes={nodes}
        onChange={handleChange}
        registerNodes={registerNodes}
        showPracticalBranchNode
        // historyTool
        // zoomTool
        // DrawerComponent={DrawerComponent}
        PopoverComponent={PopoverComponent}
        // PopconfirmComponent={PopconfirmComponent}
      />
    </>
  )
}

export default NodeForm

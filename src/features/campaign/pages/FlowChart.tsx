import { useState } from 'react'
import FlowBuilder, { INode, IRegisterNode } from 'react-flow-builder'
import BranchNode from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import ConditionNode from '../components/CustomNodes/ConditionNode'
import { StartEndNode } from '../components/CustomNodes/StartEndNode'
import ModalAddNode from '../components/ModalAddNode'
import PopoverComponent from '../components/PopoverComponent'

// const StartNodeDisplay: React.FC = () => {
//   const node = useContext(NodeContext)
//   return <div className='start-node'>{node.name}</div>
// }

// const EndNodeDisplay: React.FC = () => {
//   const node = useContext(NodeContext)
//   return <div className='end-node'>{node.name}</div>
// }

// const NodeDisplay: React.FC = () => {
//   const node = useContext(NodeContext)
//   const { removeNode } = useAction()

//   return (
//     <div
//       className={`other-node ${node.configuring ? 'node-configuring' : ''} ${
//         node.validateStatusError ? 'node-status-error' : ''
//       }`}
//     >
//       {node.data ? node.data.name : node.name}
//       <Button onClick={() => removeNode(node)}>remove</Button>
//     </div>
//   )
// }

// const ConditionNodeDisplay: React.FC = () => {
//   const node = useContext(NodeContext)
//   return (
//     <div
//       className={`condition-node ${
//         node.configuring ? 'node-configuring' : ''
//       } ${node.validateStatusError ? 'node-status-error' : ''}`}
//     >
//       {node.data ? node.data.name : node.name}
//     </div>
//   )
// }

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: 'Start',
    displayComponent: StartEndNode,
    isStart: true,
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
    addableComponent: ModalAddNode
  },
  {
    type: 'branch',
    name: 'Branch',
    conditionNodeType: 'condition',
    displayComponent: BranchNode,
    addableComponent: ModalAddNode
  }
]

const NodeForm = () => {
  const [nodes, setNodes] = useState<INode[]>([
    {
      id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
      type: 'start',
      name: 'start'
    },
    {
      id: 'node-972401ca-c4db-4268-8780-5607876d8372',
      type: 'channelNode',
      name: 'test',
      data: {
        test: 111
      }
    },
    {
      id: 'node-b106675a-5148-4a2e-aa86-8e06abd692d1',
      type: 'end',
      name: 'end'
    }
  ])

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
        showPracticalBranchRemove
        // showArrow
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

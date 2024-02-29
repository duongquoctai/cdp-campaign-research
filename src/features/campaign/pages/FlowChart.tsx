import { useEffect, useState } from 'react'
import FlowBuilder, { INode, IRegisterNode, createUuid } from 'react-flow-builder'
import BranchNode from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import { DataSourceNode } from '../components/CustomNodes/DataSourceNode'
import { StartEndNode } from '../components/CustomNodes/StartEndNode'
import ModalAddNode from '../components/ModalAddNode'
import PopoverComponent from '../components/PopoverComponent'
import './style.css'

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
    displayComponent: ChannelNode,
    addableComponent: ModalAddNode
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

const genChildren = (nodes: INode[], node: INode, action: string) => {
  if (action === 'add-node__branch') return []
  if (action === 'add-node__condition') {
    if (nodes.length <= 1) {
      return [
        { id: createUuid(), name: 'channelNode', type: 'channelNode', path: [...(node.path ?? []), '0'] },
        { id: createUuid(), name: 'end', type: 'end', path: [...(node.path ?? []), '1'] }
      ]
    } else {
      console.log(nodes)

      return [{ id: createUuid(), name: 'end', type: 'end', path: [...(node.path ?? []), '1'] }]
    }
  }
}

const recursiveUpdateNodes = (nodes: INode[], nodeChanged: INode, action: string): INode[] =>
  nodes.map((node) => {
    if (node.id === nodeChanged.id) {
      return { ...node, children: genChildren(nodes, node, action) }
    }
    if (node.children) {
      return { ...node, children: recursiveUpdateNodes(node.children, nodeChanged, action) }
    }
    return node
  })

const removeEndNodes = (nodes: INode[]) =>
  nodes.reduce((newNodes: INode[], currentNode, i) => {
    if (currentNode.children?.length) {
      currentNode.children = removeEndNodes(currentNode.children)
    }

    if (!(currentNode.type === 'end' && i && nodes[i - 1].type === 'branch' && nodes[i - 1].children?.length)) {
      newNodes.push(currentNode)
    }

    return newNodes
  }, [])

const NodeForm = () => {
  const [nodes, setNodes] = useState<INode[]>([
    { id: createUuid(), name: 'dataSource', type: 'dataSource' },
    { id: createUuid(), name: 'start', type: 'start' },
    { id: createUuid(), name: 'end', type: 'end' }
  ])

  const handleChange = (nodes: INode[], changeEvent: string, nodeChanged?: INode | undefined) => {
    console.clear()

    if (nodeChanged?.type) {
      if (
        (nodeChanged.type === 'branch' && changeEvent === 'add-node__branch') ||
        (nodeChanged.type === 'condition' && changeEvent === 'add-node__condition')
      ) {
        setNodes(removeEndNodes(recursiveUpdateNodes(nodes, nodeChanged, changeEvent)))
      } else {
        setNodes(nodes)
      }
    }
  }

  useEffect(() => {
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

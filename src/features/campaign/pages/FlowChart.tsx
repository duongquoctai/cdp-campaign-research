import { useEffect, useState } from 'react'
import FlowBuilder, { INode, IRegisterNode, createUuid } from 'react-flow-builder'
import BranchNode from '../components/CustomNodes/BranchNode'
import ChannelNode from '../components/CustomNodes/ChannelNode'
import { ConditionNode } from '../components/CustomNodes/ConditionNode'
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

const genChildren = (nodes: INode[], node: INode, action: string) => {
  if (action === 'add-node__branch') return []
  if (action === 'add-node__condition') {
    return [
      { id: createUuid(), name: 'channelNode', type: 'channelNode', path: [...(node.path ?? []), '0'] },
      { id: createUuid(), name: 'end', type: 'end', path: [...(node.path ?? []), '1'] }
    ]
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
    if (currentNode.type === 'end' && i && nodes[i - 1].type === 'branch' && nodes[i - 1].children?.length) {
      return newNodes
    }

    if (currentNode.children?.length) {
      currentNode.children = removeEndNodes(currentNode.children)
    }

    newNodes.push(currentNode)
    return newNodes
  }, [])

const addEndNodes = (nodes: INode[]) =>
  nodes.reduce((newNodes: INode[], currentNode, i) => {
    newNodes.push(currentNode)
    if (
      currentNode.type === 'branch' &&
      (!currentNode.children || !currentNode.children.length) &&
      (i === nodes.length - 1 || (i < nodes.length - 1 && nodes[i + 1].type !== 'branch'))
    ) {
      newNodes.push({ id: createUuid(), name: 'end', type: 'end' })
    }
    if (currentNode.children) {
      currentNode.children = addEndNodes(currentNode.children)
    }
    return newNodes
  }, [])

const removeConditionNodes = (nodes: INode[]): INode[] =>
  nodes.map((node) => {
    if (node.type === 'branch') {
      if (node.children?.length === 1 && node.children[0].type === 'condition') {
        return { ...node, children: [] }
      }
      if (node.children && node.children.length > 1) {
        return {
          ...node,
          children: node.children.filter(
            (child) => !(child.type === 'condition' && child.children?.length === 1 && child.children[0].type === 'end')
          )
        }
      }
    }
    return { ...node, children: node.children ? removeConditionNodes(node.children) : node.children }
  })

const NodeForm = () => {
  const [nodes, setNodes] = useState<INode[]>([
    { id: createUuid(), name: 'dataSource', type: 'dataSource' },
    { id: createUuid(), name: 'start', type: 'start' },
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

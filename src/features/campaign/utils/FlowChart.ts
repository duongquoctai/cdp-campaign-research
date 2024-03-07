import { INode, buildFlatNodes, createUuid } from 'react-flow-builder'
import { ChannelType } from '../constants/constants'
import { registerNodes } from '../pages/FlowChart'
import { useCampaignStore } from '../store/campagin'

export const genChildren = (nodes: INode[], node: INode, action: string) => {
  if (action === 'add-node__branch') return []
  if (action === 'add-node__condition') {
    return [
      { id: createUuid(), name: 'channelNode', type: 'channelNode', path: [...(node.path ?? []), '0'] },
      { id: createUuid(), name: 'end', type: 'end', path: [...(node.path ?? []), '1'] }
    ]
  }
}

export const recursiveUpdateNodes = (nodes: INode[], nodeChanged: INode, action: string): INode[] =>
  nodes.map((node) => {
    if (node.id === nodeChanged.id) {
      return { ...node, children: genChildren(nodes, node, action) }
    }
    if (node.children) {
      return { ...node, children: recursiveUpdateNodes(node.children, nodeChanged, action) }
    }
    return node
  })

export const removeEndNodes = (nodes: INode[]) =>
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

export const addEndNodes = (nodes: INode[]) =>
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

export const removeConditionNodes = (nodes: INode[]): INode[] =>
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

export const addChannelInMultipleBranch = (
  nodes: INode[],
  branchingNode: INode,
  channel: ChannelType,
  addNode: (_node: INode | string, _newNodeType?: string) => INode
) => {
  if (branchingNode.children) {
    const conditionNode = addNode(branchingNode, 'condition')
    addNode(conditionNode, channel)
    useCampaignStore.getState().setForceUpdate()
  }
}

export const removeChannelInMultipleBranch = (
  nodes: INode[],
  branchingNode: INode,
  channel: ChannelType,
  removeNode: (targetNode?: INode | INode[] | string | string[]) => void
) => {
  if (!branchingNode.children) return nodes
  const conditionNodes = branchingNode.children
  const deletedNode = conditionNodes.find((conditionNode) =>
    conditionNode.children?.some((channelNode) => channelNode.type === channel)
  )
  removeNode(deletedNode)
}

export const addMultipleBranch = (nodes: INode[], currentNode: INode) => {
  const indexOfCurrentNode = nodes.findIndex((n) => n.id === currentNode.id)
  const newMultipleBranch: INode = {
    id: createUuid(),
    type: 'branch',
    name: 'branch',
    children: []
  }
  nodes.splice(indexOfCurrentNode + 1, 0, newMultipleBranch)
  return nodes
}

export const switchAttributeBranch = (
  nodes: INode[],
  currentNode: INode,
  addNode: (_node: INode | string, _newNodeType?: string) => INode,
  removeNode: (targetNode?: INode | INode[] | string | string[]) => void
) => {
  removeNode(currentNode.children)
  addNode(currentNode, 'condition')
  addNode(currentNode, 'condition')
  return nodes
}

export const switchMultipleBranch = (
  nodes: INode[],
  currentNode: INode,
  removeNodes: (targetNode?: INode | INode[] | string | string[]) => void
) => {
  removeNodes(currentNode.children)
}

export const flatNodes = (nodes: INode[]) => {
  let result: INode[] = []
  for (const node of nodes) {
    result.push(node)
    if (node.children) {
      result = result.concat(flatNodes(node.children))
    }
  }
  return result
}

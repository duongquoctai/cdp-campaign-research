import { INode, buildFlatNodes, createUuid } from 'react-flow-builder'
import { ChannelType } from '../constants/constants'
import { registerNodes } from '../pages/FlowChart'
import { useCampaignStore } from '../store/campagin'
import { dataNode } from '../types/Campagin.type'

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

// export const removeConditionNodes = (nodes: INode[]): INode[] =>
//   nodes.map((node) => {
//     if (node.type === 'branch') {
//       if (node.children?.length === 1 && node.children[0].type === 'condition') {
//         return { ...node, children: [] }
//       }
//       if (node.children && node.children.length > 1) {
//         return {
//           ...node,
//           children: node.children.filter(
//             (child) => !(child.type === 'condition' && child.children?.length === 1 && child.children[0].type === 'end')
//           )
//         }
//       }
//     }
//     return { ...node, children: node.children ? removeConditionNodes(node.children) : node.children }
//   })

export const addChannelInMultipleBranch = (
  branchingNode: INode,
  channel: ChannelType,
  addNode: (_node: INode | string, _newNodeType?: string) => INode,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void
) => {
  if (branchingNode.children) {
    const conditionNode = addNode(branchingNode, 'condition')
    const channelNode = addNode(conditionNode, channel)
    addDataNodes(channelNode, dataNodes, setDataNodes)
    useCampaignStore.getState().setForceUpdate()
  }
}

export const removeChannelInMultipleBranch = (
  branchingNode: INode,
  channel: ChannelType,
  removeNode: (targetNode?: INode | INode[] | string | string[]) => void,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void
) => {
  if (!branchingNode.children) return
  const conditionNodes = branchingNode.children
  const deletedNode = conditionNodes.find((conditionNode) =>
    conditionNode.children?.some((channelNode) => channelNode.type === channel)
  )
  if (!deletedNode) return
  removeDataNodes(deletedNode.children, dataNodes, setDataNodes)
  removeNode(deletedNode)
}

const removeDataNodes = (
  nodes: INode[] | undefined,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void
) => {
  if (!nodes) return
  const filtered = dataNodes.filter((dataNode) => {
    return nodes.some((node) => {
      return dataNode.id !== node.id
    })
  })
  // const filter = dataNodes.filter((dataNode) => dataNode.id !== node.id)
  setDataNodes(filtered)
}

const addDataNodes = (node: INode, dataNodes: dataNode[], setDataNodes: (dataNodes: dataNode[]) => void) => {
  switch (node.type) {
    case 'branch':
      {
        const dataNode: dataNode = {
          id: node.id,
          data: {
            tree_nodes: []
          }
        }
        setDataNodes([...dataNodes, dataNode])
      }
      break
    case 'zns':
    case 'sms':
    case 'facebook':
    case 'email': {
      const dataNode: dataNode = {
        id: node.id,
        data: {
          user_data: {
            account: '',
            template: '',
            token: ''
          },
          tree_nodes: []
        }
      }
      setDataNodes([...dataNodes, dataNode])
      break
    }
    case 'loop': {
      const dataNode: dataNode = {
        id: node.id,
        data: {
          tree_nodes: [{ id: createUuid(), name: 'start', type: 'start' }]
        }
      }
      setDataNodes([...dataNodes, dataNode])
      break
    }
    default:
      break
  }
}

export const addMultipleBranch = (
  nodes: INode[],
  currentNode: INode,
  addNode: (_node: INode | string, _newNodeType?: string) => INode,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void
) => {
  const branch = addNode(currentNode, 'branch')
  branch.children = []
  addDataNodes(branch, dataNodes, setDataNodes)
  return branch
}

export const addNormalNode = (
  node: INode,
  type: string,
  addNode: (_node: INode | string, _newNodeType?: string) => INode,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void
) => {
  const newNode = addNode(node, type)
  addDataNodes(newNode, dataNodes, setDataNodes)
}

export const deleteNode = (
  node: INode,
  removeNode: (targetNode?: INode | INode[] | string | string[]) => void,
  dataNodes: dataNode[],
  setDataNodes: (dataNodes: dataNode[]) => void,
  nodes: INode[],
  setNodes: any
) => {
  if (node.type === 'branch' && nodes && setNodes) {
    const filtered = nodes.filter((n) => n.id !== node.id)
    setNodes(filtered)
    removeDataNodes([node], dataNodes, setDataNodes)
  } else {
    removeNode(node)
    removeDataNodes([node], dataNodes, setDataNodes)
  }
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

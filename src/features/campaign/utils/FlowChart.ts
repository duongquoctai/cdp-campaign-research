import { INode, createUuid } from 'react-flow-builder'

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

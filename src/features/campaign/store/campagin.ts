import { INode, createUuid } from 'react-flow-builder'
import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'
import { dataNode } from '../types/Campagin.type'
import isEqual from 'react-fast-compare'

export interface UseCampaignStore {
  nodes: INode[]
  forceUpdate: boolean
  setNodes: (nodes: INode[]) => void
  setForceUpdate: () => void
}

export interface UseCampaignDataStore {
  dataNodes: dataNode[]
  setDataNodes: (dataNodes: dataNode[]) => void
  setDataNode: (dataNodes: dataNode) => void
}

export const useCampaignStore = create<UseCampaignStore>((set) => ({
  nodes: [
    { id: createUuid(), name: 'dataSource', type: 'dataSource' },
    { id: createUuid(), name: 'start', type: 'start' },
    // { id: createUuid(), name: 'branch', type: 'branch' },
    { id: createUuid(), name: 'end', type: 'end' }
  ],
  forceUpdate: false,
  setNodes: (nodes: INode[]) => set({ nodes }),
  setForceUpdate: () => set((prev) => ({ forceUpdate: !prev }))
}))

export const useCampaignDataStore = createWithEqualityFn<UseCampaignDataStore>(
  (set) => ({
    dataNodes: [],
    setDataNodes: (dataNodes: dataNode[]) => set({ dataNodes }),
    setDataNode: (dataNode: dataNode) =>
      set((prev) => {
        const dataNodes = prev.dataNodes
        return {
          dataNodes: dataNodes.map((node) => {
            if (node.id === dataNode.id) {
              return dataNode
            } else {
              return node
            }
          })
        }
      })
  }),
  isEqual
)

import { INode, createUuid } from 'react-flow-builder'
import { create } from 'zustand'

interface useCampaignStore {
  nodes: INode[]
  setNodes: (nodes: INode[]) => void
}

export const useCampaignStore = create<useCampaignStore>((set) => ({
  nodes: [
    { id: createUuid(), name: 'dataSource', type: 'dataSource' },
    { id: createUuid(), name: 'start', type: 'start' },
    // { id: createUuid(), name: 'branch', type: 'branch' },
    { id: createUuid(), name: 'end', type: 'end' }
  ],
  setNodes: (nodes: INode[]) => set({ nodes })
}))

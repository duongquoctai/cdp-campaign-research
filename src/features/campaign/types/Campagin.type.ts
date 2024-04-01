import { INode } from 'react-flow-builder'

export interface UserDataNodeType {
  account: string
  template: string
  token: string
}

export interface dataNode {
  id: string
  data: {
    user_data?: UserDataNodeType
    tree_nodes?: INode[]
  }
}

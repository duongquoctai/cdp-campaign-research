import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { useContext, useState } from 'react'
import { INode, NodeContext, createUuid, useAction } from 'react-flow-builder'
import { ChannelType } from '~/features/campaign/constants/constants'
import { registerNodes } from '~/features/campaign/pages/FlowChart'
import { useCampaignStore } from '~/features/campaign/store/campagin'
import { addChannelInMultipleBranch, removeChannelInMultipleBranch } from '~/features/campaign/utils/FlowChart'

export const MultiChannels = () => {
  const { addNode, removeNode } = useAction()
  const node = useContext(NodeContext)
  const { nodes, setNodes } = useCampaignStore()
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const onSelectChannel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChannels((state) => {
      if (state.includes(event.target.name)) {
        const newNodes = removeChannelInMultipleBranch(nodes, node, event.target.name as ChannelType)
        setNodes(newNodes)
        return state.filter((channel) => channel !== event.target.name)
      } else {
        const newNodes = addChannelInMultipleBranch(nodes, node, event.target.name as ChannelType)
        setNodes(newNodes)
        return [...state, event.target.name]
      }
    })
  }

  console.log('nodes', nodes)

  return (
    <FormGroup>
      <Grid container>
        {registerNodes
          .filter((rn) => Object.values(ChannelType).includes(rn.name as ChannelType))
          .map((channel) => (
            <Grid key={channel.name} item xs={4}>
              <FormControlLabel
                label={channel.name}
                control={
                  <Checkbox
                    checked={selectedChannels.includes(channel.name)}
                    onChange={onSelectChannel}
                    name={channel.name}
                  />
                }
              />
            </Grid>
          ))}
      </Grid>
    </FormGroup>
  )
}

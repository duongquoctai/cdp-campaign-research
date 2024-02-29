import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { useContext, useState } from 'react'
import { NodeContext, createUuid, useAction } from 'react-flow-builder'

const CHANNELS = ['facebook', 'zalo', 'email', 'sms']

export const MultiChannels = () => {
  const { addNode, removeNode } = useAction()
  const node = useContext(NodeContext)

  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const onSelectChannel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChannels((state) => {
      if (state.includes(event.target.name)) {
        // removeNode(node.children?.find((child) => child.)?.id)
        return state.filter((channel) => channel !== event.target.name)
      } else {
        // addNode({ type: 'condition', name: event.target.name, id: createUuid() }, 'condition')
        addNode('condition')
        return [...state, event.target.name]
      }
    })
  }

  console.log(node)

  return (
    <FormGroup>
      <Grid container>
        {CHANNELS.map((channel) => (
          <Grid key={channel} item xs={4}>
            <FormControlLabel
              label={channel}
              control={
                <Checkbox checked={selectedChannels.includes(channel)} onChange={onSelectChannel} name={channel} />
              }
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  )
}

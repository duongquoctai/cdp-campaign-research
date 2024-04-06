import { Box, Button, Card, CardContent, CardHeader, Stack, Tab, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { NodeContext, useAction } from 'react-flow-builder'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { MultiChannels } from './MultiChannels'
import { switchAttributeBranch, switchMultipleBranch } from '~/features/campaign/utils/FlowChart'
import { useCampaignStore } from '~/features/campaign/store/campagin'
import ButtonDeleteNode from '../../ButtonDeleteNode'

export const BranchNode = () => {
  // utils
  const node = useContext(NodeContext)
  const { nodes, setNodes } = useCampaignStore()
  const { removeNode, addNode } = useAction()

  // states
  const [isExpand, setIsExpand] = useState(true)
  const [currentTab, setCurrentTab] = useState('1')

  // funcs
  const toggleExpand = () => setIsExpand((state) => !state)

  const handleChange = (_: unknown, newValue: string) => {
    switch (newValue) {
      case '1':
        switchMultipleBranch(nodes, node, removeNode)
        break
      case '2':
        switchAttributeBranch(nodes, node, addNode, removeNode)
        break
      default:
        break
    }
    setCurrentTab(newValue)
  }

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography>{node.name}</Typography>
            <ButtonDeleteNode />
          </Stack>
        }
      />

      <CardContent>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Đa kênh' value='1' />
              <Tab label='A/B' value='2' />
              <Tab label='Thuộc tính' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <MultiChannels />
          </TabPanel>
          <TabPanel value='2'>A/B</TabPanel>
          <TabPanel value='3'>Thuộc tính</TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

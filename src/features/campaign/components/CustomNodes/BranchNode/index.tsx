import { Box, Button, Card, CardContent, CardHeader, Stack, Tab, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { NodeContext, useAction } from 'react-flow-builder'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { MultiChannels } from './MultiChannels'

export const BranchNode = () => {
  // utils
  const node = useContext(NodeContext)
  const { removeNode } = useAction()

  // states
  const [isExpand, setIsExpand] = useState(true)
  const [currentTab, setCurrentTab] = useState('1')

  // funcs
  const toggleExpand = () => setIsExpand((state) => !state)

  const handleChange = (_: unknown, newValue: string) => setCurrentTab(newValue)

  return (
    <Card onClick={toggleExpand}>
      <CardHeader
        title={
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography>{node.name}</Typography>
            <Button onClick={() => removeNode()}>Remove</Button>
          </Stack>
        }
      />
      {isExpand && (
        <CardContent onClick={(e) => e.stopPropagation()}>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='da kenh' value='1' />
                <Tab label='thuoc tinh' value='2' />
                <Tab label='chia a/b' value='3' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <MultiChannels />
            </TabPanel>
            <TabPanel value='2'>thuoc tinh</TabPanel>
            <TabPanel value='3'>chia a/b</TabPanel>
          </TabContext>
        </CardContent>
      )}
    </Card>
  )
}

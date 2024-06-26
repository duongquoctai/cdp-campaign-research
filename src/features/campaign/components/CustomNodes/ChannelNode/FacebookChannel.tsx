import React, { useContext } from 'react'
import { Box, Card, Collapse, TextField } from '@mui/material'
import { NodeContext } from 'react-flow-builder'
import { isEqual } from 'lodash'
import { useCampaignDataStore } from '~/features/campaign/store/campagin'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserDataNodeType, dataNode } from '~/features/campaign/types/Campagin.type'
import ButtonDeleteNode from '../../ButtonDeleteNode'
import NodeWrapper from '../../NodeWrapper'

const FacebookChannel = React.memo(
  (props: any) => {
    const id = props.node?.id
    const [collapse, setCollapse] = React.useState(true)
    const setDataNode = useCampaignDataStore((state) => state.setDataNode)
    const node = useCampaignDataStore((state) => state.dataNodes.find((n) => n.id === id)?.data.user_data)
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      formState: { errors }
    } = useForm<UserDataNodeType>({
      defaultValues: node,
      mode: 'onBlur'
    })

    const handleBlur = (key: string, value: string) => {
      const form = getValues()
      const newNode: dataNode = {
        id,
        data: {
          user_data: {
            ...form,
            [key]: value
          }
        }
      }
      setDataNode(newNode)
    }

    return (
      <NodeWrapper>
        <Card>
          <Box sx={{ padding: 4 }}>
            <ButtonDeleteNode />
            <Box onClick={() => setCollapse(!collapse)}>Facebook</Box>
            <Collapse unmountOnExit in={collapse}>
              <form>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    {...register('account')}
                    onBlur={(e) => handleBlur('account', e.target.value)}
                    label='account'
                  />
                </Box>

                <Box mt={2}>
                  <TextField
                    fullWidth
                    {...register('template')}
                    onBlur={(e) => handleBlur('template', e.target.value)}
                    label='template'
                  />
                </Box>

                <Box mt={2}>
                  <TextField
                    fullWidth
                    {...register('token')}
                    onBlur={(e) => handleBlur('token', e.target.value)}
                    label='token'
                  />
                </Box>
              </form>
            </Collapse>
          </Box>
        </Card>
      </NodeWrapper>
    )
  },
  (a, b) => a?.node.id === b?.node.id
)

export default FacebookChannel

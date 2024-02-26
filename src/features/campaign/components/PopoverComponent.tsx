import { IconButton, Popover } from '@mui/material'
import React from 'react'
import { IPopoverComponent } from 'react-flow-builder'

const PopoverComponent = (props: IPopoverComponent) => {
  const { visible, children, content, onVisibleChange } = props

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    onVisibleChange(false)
  }

  return (
    <>
      <IconButton
        disableFocusRipple
        disableRipple
        disableTouchRipple
        onClick={(e) => {
          handleClick(e)
          onVisibleChange(true)
        }}
        sx={{
          padding: '0',
          outline: 'none !important',
          borderRadius: '4px',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          width: '24px',
          height: '24px'
        }}
      >
        {children}
      </IconButton>

      <Popover
        open={visible}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          ml: 1
        }}
      >
        {content}
      </Popover>
    </>
  )
}

export default PopoverComponent

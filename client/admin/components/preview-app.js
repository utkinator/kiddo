import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const PreviewApp = ({ hash, onClose }) => {
    return (
        <Dialog
            fullScreen
            open
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {hash}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <iframe
                    src={`${hash}/`}
                    frameBorder="0"
                    style={{ overflow: 'hidden', height: '100%', width: '100%' }}
                    height="100%"
                    width="100%"
                />
            </DialogContent>
        </Dialog>
    )
}

PreviewApp.propTypes = {
    hash: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default PreviewApp

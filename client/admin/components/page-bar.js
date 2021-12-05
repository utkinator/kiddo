import React from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'

const PageBar = ({ children }) => {
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            mb={2}
        >
            {children}
        </Stack>
    )
}

PageBar.propTypes = {
    children: PropTypes.node.isRequired
}

export default PageBar

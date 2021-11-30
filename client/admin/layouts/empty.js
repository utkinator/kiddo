import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'

export const EmptyLayout = ({ children }) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            style={{ height: '100vh' }}
        >
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}

EmptyLayout.propTypes = {
    children: PropTypes.element.isRequired
}

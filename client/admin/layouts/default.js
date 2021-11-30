import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'

import Header from '../components/header'

export const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <main>
                        {children}
                    </main>
                </Grid>
                <Grid item xs>
                    <nav>
                        Actions here
                    </nav>
                </Grid>
            </Grid>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
}

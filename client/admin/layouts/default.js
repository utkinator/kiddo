import React from 'react'
import PropTypes from 'prop-types'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Header from '../components/header'

export const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Box pt={3}>
                    <main>
                        {children}
                    </main>
                </Box>
            </Container>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
}

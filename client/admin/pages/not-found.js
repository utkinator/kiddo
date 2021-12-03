import React from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { EmptyLayout } from '../layouts'

const duckLayImageUrl = new URL(
    '../assets/duck-lay.png?as=webp&width=250',
    import.meta.url
)

const NotFoundPage = () => (
    <EmptyLayout>
        <Stack direction="column" alignItems="center">
            <Typography variant="h6">Not Found</Typography>
            <img src={duckLayImageUrl} width={50} />
        </Stack>
    </EmptyLayout>
)

export default NotFoundPage

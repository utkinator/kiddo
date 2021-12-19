import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'

import { DefaultLayout } from '../layouts'
import { PageBar, PreviewApp } from '../components'
import { useAuth } from '../auth'

const AppPage = () => {
    const auth = useAuth()
    const { appHash } = useParams()
    const [values, setValues] = useState(null)
    const [openPreviewApp, setOpenPreviewApp] = useState(false)

    const handleOpenPreviewApp = () => {
        setOpenPreviewApp(true)
    }

    const handleClosePreviewApp = () => {
        setOpenPreviewApp(false)
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/apps/${appHash}`, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            })

            if (!response.ok) {
                Promise.reject(new Error(`Error fetching data for app ${appHash}: ${response.message}`))
                return
            }

            const { app: { hash, code, version, createdAt, updatedAt } } = await response.json()

            setValues({
                hash, code, version, createdAt, updatedAt
            })
        })()
    }, [])

    return (
        <DefaultLayout maxWidth="md">
            <PageBar>
                <Button
                    variant="outlined"
                    key="add-new-user"
                    startIcon={<PreviewIcon />}
                    onClick={handleOpenPreviewApp}
                >
                    Preview
                </Button>
            </PageBar>
            <code>
                {JSON.stringify(values)}
            </code>
            {openPreviewApp && (
                <PreviewApp
                    hash={appHash}
                    onClose={handleClosePreviewApp}
                />
            )}
        </DefaultLayout>
    )
}

export default AppPage

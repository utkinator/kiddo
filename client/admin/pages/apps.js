import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import {
    Link
} from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { DefaultLayout } from '../layouts'
import { useAuth } from '../auth'

const AppsList = ({ apps, onDeleteApp }) => {
    if (!apps.length) {
        return <div>No apps</div>
    }

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="apps list">
            <TableHead>
                <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Version</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Updated</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {apps.map(({ hash, code, version, createdAt, updatedAt }) => (
                    <TableRow
                        key={hash}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {hash}
                        </TableCell>
                        <TableCell align="right">{code}</TableCell>
                        <TableCell align="right">{version}</TableCell>
                        <TableCell align="right">{moment(createdAt).format('MM.DD.YYYY, hh:mm:ss')}</TableCell>
                        <TableCell align="right">{moment(updatedAt).format('MM.DD.YYYY, hh:mm:ss')}</TableCell>
                        <TableCell align="right">
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="flex-end"
                            >
                                <Button
                                    component={Link}
                                    to={`/apps/${hash}`}
                                    key="edit"
                                    variant='outlined'
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="error"
                                    key="delete"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => onDeleteApp(hash)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

AppsList.propTypes = {
    apps: PropTypes.array.isRequired,
    onDeleteApp: PropTypes.func.isRequired
}

const AppsPage = () => {
    const auth = useAuth()
    const [apps, setApps] = useState([])

    const fetchApps = () => {
        fetch('/api/apps', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }
        })
            .then(response => response.json())
            .then(data => setApps(data.apps))
            .catch(error => {
                console.log('Error fetching apps:', error)
            })
    }

    useEffect(() => {
        fetchApps()
    }, [])

    const handleDeleteApp = hash => {
        fetch(`/api/apps/${hash}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }
        })
            .then(response => response.json())
            .then(data => fetchApps())
            .catch(error => {
                console.log(`Error deletion app ${hash}:`, error)
            })
    }

    return (
        <DefaultLayout>
            <AppsList
                apps={apps}
                onDeleteApp={handleDeleteApp}
            />
        </DefaultLayout>
    )
}

export default AppsPage

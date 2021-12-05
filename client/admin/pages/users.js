import React, { useEffect, useState } from 'react'
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

const UsersList = () => {
    const auth = useAuth()
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        fetch('/api/users', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }
        })
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => {
                console.log('Error fetching users:', error)
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDeleteUser = id => {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }
        })
            .then(response => response.json())
            .then(data => fetchUsers())
            .catch(error => {
                console.log(`Error deletion user ${id}:`, error)
            })
    }

    if (!users.length) {
        return <div>No users</div>
    }

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users list">
            <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Roles</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Updated</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(({ id, email, username, roles, createdAt, updatedAt }) => (
                    <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {username}
                        </TableCell>
                        <TableCell align="right">{email}</TableCell>
                        <TableCell align="right">{roles}</TableCell>
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
                                    to={`/users/${id}`}
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
                                    onClick={e => handleDeleteUser(id)}
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

const UsersPage = () => (
    <DefaultLayout>
        <UsersList />
    </DefaultLayout>
)

export default UsersPage

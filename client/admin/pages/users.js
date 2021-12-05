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
import AddIcon from '@mui/icons-material/Add'

import { DefaultLayout } from '../layouts'
import { NewUserForm, PageBar } from '../components'
import { useAuth } from '../auth'

const UsersList = ({ users, onDeleteUser }) => {
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
                    <TableCell align="right">Active</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Updated</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(({ id, email, username, roles, active, createdAt, updatedAt }) => (
                    <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {username}
                        </TableCell>
                        <TableCell align="right">{email}</TableCell>
                        <TableCell align="right">{roles}</TableCell>
                        <TableCell align="right">{active}</TableCell>
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
                                    onClick={() => onDeleteUser(id)}
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

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onDeleteUser: PropTypes.func.isRequired
}

const UsersPage = () => {
    const auth = useAuth()
    const [users, setUsers] = useState([])
    const [openUserForm, setOpenUserForm] = useState(false)

    const handleOpenUserForm = () => {
        setOpenUserForm(true)
    }

    const handleCloseUserForm = () => {
        setOpenUserForm(false)
        fetchUsers()
    }

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

    return (
        <DefaultLayout>
            <PageBar>
                <Button
                    variant="outlined"
                    color="success"
                    key="add-new-user"
                    startIcon={<AddIcon />}
                    onClick={handleOpenUserForm}
                >
                    Add New User
                </Button>
            </PageBar>
            {openUserForm && (
                <NewUserForm
                    onClose={handleCloseUserForm}
                />
            )}
            <UsersList
                users={users}
                onDeleteUser={handleDeleteUser}
            />
        </DefaultLayout>
    )
}

export default UsersPage

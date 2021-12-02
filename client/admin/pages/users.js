import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { DefaultLayout } from '../layouts'
import { useAuth } from '../auth'

const UsersList = () => {
    const auth = useAuth()
    const [users, setUsers] = useState([])

    useEffect(() => {
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
    }, [])

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
                        <TableCell align="right">{createdAt}</TableCell>
                        <TableCell align="right">{updatedAt}</TableCell>
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

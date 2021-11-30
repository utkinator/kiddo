import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { DefaultLayout } from '../layouts'
import { useAuth } from '../auth'

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300,
        flex: 1
    },
    {
        field: 'username',
        headerName: 'Username',
        minWidth: 250
    },
    {
        field: 'email',
        headerName: 'Email',
        minWidth: 250
    },
    {
        field: 'roles',
        headerName: 'Roles',
        width: 250
    },
    {
        field: 'createdAt',
        headerName: 'Created',
        type: 'dateTime',
        width: 250
    },
    {
        field: 'updatedAt',
        headerName: 'Updated',
        type: 'dateTime',
        width: 250
    }
]

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

    console.log(users)

    return <DataGrid
        autoHeight
        rows={users}
        columns={columns}
    />
}

const UsersPage = () => (
    <DefaultLayout>
        <UsersList />
    </DefaultLayout>
)

export default UsersPage

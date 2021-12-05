import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

import { DefaultLayout } from '../layouts'
import { useAuth } from '../auth'

const availableRoles = [
    'user',
    'moderator',
    'admin'
]

const UserPage = () => {
    const auth = useAuth()
    const { userId } = useParams()
    const [values, setValues] = useState({
        username: '',
        email: '',
        roles: ''
    })

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            })

            if (!response.ok) {
                Promise.reject(new Error(`Error fetching data for user ${userId}: ${response.message}`))
                return
            }

            const { user: { username, email, roles } } = await response.json()

            setValues({
                username, email, roles
            })
        })()
    }, [])

    const handleChange = e => {
        setValues(prevValues => {
            return {
                ...prevValues,
                [e.target.name]: Array.isArray(e.target.value)
                    ? e.target.value.join(',')
                    : e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(values)

        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    }

    return (
        <DefaultLayout maxWidth="md">
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                pt={3}
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="roles">Roles</InputLabel>
                            <Select
                                labelId="roles"
                                id="roles-selector"
                                multiple
                                value={values.roles.split(',')}
                                onChange={handleChange}
                                input={<OutlinedInput label="Roles" />}
                                renderValue={(selected) => selected.join(', ')}
                                name="roles"
                            >
                                {availableRoles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        <Checkbox checked={values.roles.indexOf(role) > -1} />
                                        <ListItemText primary={role} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </DefaultLayout>
    )
}

export default UserPage

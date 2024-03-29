import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { DefaultLayout } from '../layouts'
import { useAuth } from '../auth'

const ProfilePage = () => {
    const auth = useAuth()

    const [values, setValues] = useState({
        username: auth.user.username,
        email: auth.user.email,
        roles: auth.user.roles
    })

    useEffect(() => {
        auth.checkAuth()
            .then(({ username, email, roles }) => {
                setValues({
                    username, email, roles
                })
            })
            .catch(response => {
                console.log('fail', response)
            })
    }, [])

    const handleChange = e => {
        setValues(prevValues => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        fetch('/api/user', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    }

    return (
        <DefaultLayout maxWidth='md'>
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

export default ProfilePage

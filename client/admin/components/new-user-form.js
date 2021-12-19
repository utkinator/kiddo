import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const NewUserForm = ({ onClose, ...other }) => {
    const [passwordConfirmed, setPasswordConfirmed] = useState(false)
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    useEffect(() => {
        setPasswordConfirmed(values.password && values.password === values.passwordConfirm)
    }, [values])

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

        if (!passwordConfirmed) {
            return
        }

        fetch('/api/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log('new user ->', user)
                onClose()
            })
            .catch(error => {
                console.log(`Error while adding new user ${values}:`, error)
            })
    }

    return (
        <Dialog open>
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        id="password-confirm"
                        label="Password Confirm"
                        type="password"
                        fullWidth
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        variant="outlined"
                        type="submit"
                        disabled={!passwordConfirmed}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

NewUserForm.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default NewUserForm

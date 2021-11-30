import React, { useState } from 'react'
import {
    useNavigate,
    useLocation
} from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { useAuth } from '../auth'
import { EmptyLayout } from '../layouts'

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()
    // TODO: clean creds
    const [email, setEmail] = useState('v@v.com')
    const [password, setPassword] = useState('password')

    const from = location.state?.from?.pathname || '/'

    const onSuccessLogin = () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        auth.login({
            email,
            password,
            cb: onSuccessLogin
        })
    }

    return (
        <EmptyLayout>
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="email@example.com"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </EmptyLayout>
    )
}

export default LoginPage

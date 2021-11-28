import React, { useState } from 'react'
import {
    useNavigate,
    useLocation
} from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useAuth } from '../auth'

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()
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

        auth.login({ email, password, cb: onSuccessLogin })
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            autoComplete="off"
        >
            <TextField
                required
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
            />
            <TextField
                required
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Submit</Button>
        </Box>
    )
}

export default LoginPage

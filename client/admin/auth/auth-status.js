import React, { useCallback } from 'react'
import {
    useNavigate
} from 'react-router-dom'
import Button from '@mui/material/Button'

import { useAuth } from '.'

export const AuthStatus = () => {
    const navigate = useNavigate()
    const auth = useAuth()

    const onSuccessLogout = () => {
        navigate('/')
    }

    const handleLogout = useCallback(async () => {
        await auth.logout({ cb: onSuccessLogout })
    }, [auth])

    if (!auth.user) {
        return null
    }

    return (
        <div>
            Welcome {auth.user.username}
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

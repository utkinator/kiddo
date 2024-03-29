import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { jwtAuthProvider } from '.'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('sessionData')))

    const login = async ({ email, password, cb }) => {
        const user = await jwtAuthProvider.login({ email, password })

        setUser(user)
        cb()
    }

    const logout = async ({ cb }) => {
        jwtAuthProvider.logout()

        setUser(null)
        cb()
    }

    const value = { user, login, logout, checkAuth: jwtAuthProvider.checkAuth }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
}

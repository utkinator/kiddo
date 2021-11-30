import React from 'react'
import PropTypes from 'prop-types'
import {
    Navigate,
    useLocation
} from 'react-router-dom'

import { useAuth } from '.'

export const RequireAuth = ({ children, roles = ['admin', 'moderator'] }) => {
    const auth = useAuth()
    const location = useLocation()

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />
    }

    if (roles.length) {
        const userRoles = auth.user.roles.split(',') || []
        const foundRoles = roles.filter(role => userRoles.some(userRole => userRole === role))

        if (!foundRoles.length) {
            return <Navigate to="/login" state={{ from: location }} />
        }
    }

    return children
}

RequireAuth.propTypes = {
    children: PropTypes.element.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string)
}

import React, { useCallback, useState, Fragment } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'

import SettingsIcon from '@mui/icons-material/Settings'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import AppsIcon from '@mui/icons-material/Apps'

import {
    Link,
    useNavigate
} from 'react-router-dom'

import {
    useAuth
} from '../auth'

const Header = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [anchorElNav, setAnchorElNav] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const onSuccessLogout = () => {
        navigate('/')
    }

    const handleLogout = useCallback(async () => {
        await auth.logout({ cb: onSuccessLogout })
    }, [auth])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            <MenuItem
                                key="home"
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to="/"
                            >
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem
                                key="users"
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to="/users"
                            >
                                <Typography textAlign="center">Users</Typography>
                            </MenuItem>
                            <MenuItem
                                key="apps"
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to="/apps"
                            >
                                <Typography textAlign="center">Apps</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            key="home"
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/"
                            sx={{ color: 'white' }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            key="users"
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/users"
                            sx={{ color: 'white' }}
                        >
                            <GroupIcon />
                        </IconButton>
                        <IconButton
                            key="apps"
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/apps"
                            sx={{ color: 'white' }}
                        >
                            <AppsIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ alignItems: 'center', display: { xs: 'flex' } }}>
                        {
                            auth.user
                                ? (
                                    <Fragment>
                                        <Typography mr={1}>{auth.user.username}</Typography>
                                        <Typography variant="subtitle1" mr={2}>({auth.user.roles})</Typography>
                                        <IconButton
                                            size="large"
                                            aria-label="User Profile"
                                            color="inherit"
                                            key="profile"
                                            component={Link}
                                            to="/profile"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                        <IconButton
                                            size="large"
                                            aria-label="Logout"
                                            color="inherit"
                                            key="logout"
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </Fragment>
                                )
                                : (
                                    <IconButton
                                        size="large"
                                        aria-label="Login"
                                        color="inherit"
                                        key="login"
                                        component={Link}
                                        to="/login"
                                    >
                                        <LoginIcon />
                                    </IconButton>
                                )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header

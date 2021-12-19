import React, { Suspense, Fragment } from 'react'
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'

import {
    Home,
    Users,
    User,
    Apps,
    App,
    Profile,
    Login,
    NotFound
} from './pages'

import {
    AuthProvider,
    RequireAuth
} from './auth'

const AdminApp = () => {
    return (
        <Fragment>
            <CssBaseline />
            <AuthProvider>
                <HashRouter hashType="noslash">
                    <Routes>
                        <Route index path="/" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Home />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/profile" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Profile />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/users" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Users />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/users/:userId" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <User />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/apps" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Apps />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/apps/:appHash" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <App />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route path="/login" element={
                            <Suspense fallback={<CircularProgress />}>
                                <Login />
                            </Suspense>
                        } />
                        <Route path="*" element={
                            <Suspense fallback={<CircularProgress />}>
                                <NotFound />
                            </Suspense>
                        } />
                    </Routes>
                </HashRouter>
            </AuthProvider>
        </Fragment>
    )
}

export default AdminApp

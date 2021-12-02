import React, { Suspense, Fragment } from 'react'
import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'

import {
    Home,
    Users,
    Profile,
    Login,
    NotFound
} from './pages'

import {
    AuthProvider,
    RequireAuth
} from './auth'

const App = () => {
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
                        <Route index path="/profile" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Profile />
                                </Suspense>
                            </RequireAuth>
                        } />
                        <Route index path="/users" element={
                            <RequireAuth>
                                <Suspense fallback={<CircularProgress />}>
                                    <Users />
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

export default App

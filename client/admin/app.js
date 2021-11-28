import React, { Suspense, Fragment } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import {
    Home,
    Users,
    Profile,
    Login,
    NotFound
} from './pages'

import Header from './components/header'

import {
    AuthProvider,
    RequireAuth
} from './auth'

const App = () => {
    return (
        <Fragment>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <div>
                        <Header />
                        <main>
                            <Routes>
                                <Route index path="/" element={
                                    <RequireAuth>
                                        <Suspense fallback={<>...</>}>
                                            <Home />
                                        </Suspense>
                                    </RequireAuth>
                                } />
                                <Route index path="/profile" element={
                                    <RequireAuth>
                                        <Suspense fallback={<>...</>}>
                                            <Profile />
                                        </Suspense>
                                    </RequireAuth>
                                } />
                                <Route index path="/users" element={
                                    <RequireAuth>
                                        <Suspense fallback={<>...</>}>
                                            <Users />
                                        </Suspense>
                                    </RequireAuth>
                                } />
                                <Route path="/login" element={
                                    <Suspense fallback={<>...</>}>
                                        <Login />
                                    </Suspense>
                                } />
                                <Route path="*" element={
                                    <Suspense fallback={<>...</>}>
                                        <NotFound />
                                    </Suspense>
                                } />
                            </Routes>
                        </main>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </Fragment>
    )
}

export default App

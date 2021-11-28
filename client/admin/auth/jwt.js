const jwtAuthProvider = {
    login: async ({ email, password }) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if (!response.ok) {
                Promise.reject(new Error('Login failed'))
                return
            }

            const { user } = await response.json()

            window.localStorage.setItem('sessionData', JSON.stringify(user))

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    logout: () => {
        window.localStorage.removeItem('sessionData')
    },
    checkAuth: async () => {
        try {
            const { token } = JSON.parse(window.localStorage.getItem('sessionData'))

            console.log('checkAuth', token)

            const response = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('response ->', response)

            // if (!response.ok) {
            //     Promise.reject(new Error('Login failed'))
            //     return
            // }

            // const { user } = await response.json()

            // window.localStorage.setItem('sessionData', user.token)

            // return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    loadAuthToken: () => {
        try {
            const {token} = JSON.parse(window.localStorage.getItem('sessionData'))

            if (!token) {
                return null
            }

            return token
        } catch (error) {
            console.log('Session token in local storage is missing or invalid.', error)
        }

        return null
    }
}

export { jwtAuthProvider }

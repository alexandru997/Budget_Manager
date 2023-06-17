import { useContext, createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Spinner } from '../components'
import { auth } from '../firebase'

const authContext = createContext()

const useAuth = () => {
    return useContext(authContext)
}

const AuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)

    const createUser = async ({ email, password }) => {
        await auth.createUserWithEmailAndPassword(email, password)
    }

    const clearSession = () => {
        try {
            auth.signOut()
            //Remove backaground color when logout with black theme
            //Better to be moved in useTheme hook
            document.querySelector('body').style.backgroundColor = null
        } catch (e) {
            console.log(e)
        }
    }

    if (loading) {
        return (
            <div className='mt-3'>
                <Spinner />
            </div>
        )
    }

    return (
        <authContext.Provider
            value={{
                isAuthenticated: !!user,
                loading: loading,
                error,
                user,
                clearSession,
                createUser,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { useAuth }
export default AuthProvider

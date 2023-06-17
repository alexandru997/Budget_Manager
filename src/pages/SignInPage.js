import { lazy, useState } from 'react'
import { SuspenseComponent, Spinner, Alert, Heading } from '../components'
import { auth } from '../firebase'

const SignIn = lazy(() => import('../components/SignIn'))
const ResetPasswordLink = lazy(() =>
    import('../components/ResetPassword/ResetPasswordLink')
)

const SignInPage = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            await auth.signInWithEmailAndPassword(email, password)
        } catch ({ message }) {
            setError(message)
            setLoading(false)
        }
    }
    return (
        <>
            <div className='row '>
                <div className='col d-flex justify-content-center'>
                    <Heading text='Intră în cont' />
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-12 col-lg-8 col-xl-6'>
                    <Alert message={error} />
                    {loading && <Spinner />}
                    <SuspenseComponent>
                        <SignIn onSubmit={onSubmit} />
                        <ResetPasswordLink />
                    </SuspenseComponent>
                </div>
            </div>
        </>
    )
}

export default SignInPage

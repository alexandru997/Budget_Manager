import { lazy, useState } from 'react'
import { Alert, Spinner, SuspenseComponent, Heading } from '../components'
import { useAuth } from '../context'

const SignUp = lazy(() => import('../components/SignUp'))
const ResetPasswordLink = lazy(() =>
    import('../components/ResetPassword/ResetPasswordLink')
)

const SignUpPage = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { createUser } = useAuth()
    const onSubmit = async ({ email, password, firstName, lastName }) => {
        try {
            setLoading(true)
            await createUser({ email, password, firstName, lastName })
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }
    return (
        <>
            <div className='row '>
                <div className='col d-flex justify-content-center'>
                    <Heading text='Creează un cont' />
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-12 col-lg-8 col-xl-6'>
                    <Alert message={error} />
                    {loading && <Spinner />}
                    <SuspenseComponent>
                        <SignUp onSubmit={onSubmit} />
                        <ResetPasswordLink />
                    </SuspenseComponent>
                </div>
            </div>
        </>
    )
}

export default SignUpPage

import { useState, lazy } from 'react'
import { auth } from '../firebase'
import { Alert, SuspenseComponent, Heading } from '../components'

const ResetPassword = lazy(() => import('../components/ResetPassword'))

const ResetPasswordPage = () => {
    const [message, setMessage] = useState(null)

    const onSubmit = ({ email }, { resetForm }) => {
        auth.sendPasswordResetEmail(email)
        setMessage('Link de resetare transmis')
        resetForm()
    }

    return (
        <>
            <Heading text='Resetare Parola prin email' />
            {message && <Alert message={message} type='alert-success' />}
            <SuspenseComponent>
                <ResetPassword onSubmit={onSubmit} />
            </SuspenseComponent>
        </>
    )
}

export default ResetPasswordPage

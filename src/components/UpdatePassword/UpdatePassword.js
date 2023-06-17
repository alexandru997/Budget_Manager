import { useState } from 'react'
import { useAuth } from '../../context'
import FormikWrapper from '../FormComponents'
import Spinner from '../Spinner'
import * as UpdatePasswordForm from './UpdatePasswordForm'

const UpdatePassword = ({ onSuccess, onError }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const onSubmit = async ({ newPassword }, { resetForm }) => {
        try {
            setLoading(true)
            await user.updatePassword(newPassword)
            resetForm()
            onSuccess('Salvat.')
        } catch (e) {
            onError(e.message)
        } finally {
            setLoading(false)
        }
    }

    const onReset = () => {
        onSuccess(null)
    }

    return (
        <>
            {loading && <Spinner />}
            <FormikWrapper
                initialValues={{
                    newPassword: '',
                    confirmPassword: '',
                }}
                onSubmit={onSubmit}
                onReset={onReset}
                validationSchema={UpdatePasswordForm.validationSchema}
                Component={UpdatePasswordForm.UpdatePasswordForm}
            />
        </>
    )
}

export default UpdatePassword

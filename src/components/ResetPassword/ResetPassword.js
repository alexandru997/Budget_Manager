import FormikWrapper from '../FormComponents'
import * as ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({ onSubmit }) => {
    const initialValues = {
        email: '',
    }

    return (
        <FormikWrapper
            initialValues={initialValues}
            onSubmit={onSubmit}
            Component={ResetPasswordForm.ResetPasswordForm}
            validationSchema={ResetPasswordForm.validationSchema}
        />
    )
}

export default ResetPassword

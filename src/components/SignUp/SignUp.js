import FormikWrapper from '../FormComponents'
import * as SignUpForm from './SignUpForm'

const SignUp = ({ onSubmit }) => {
    return (
        <FormikWrapper
            initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
            }}
            onSubmit={onSubmit}
            Component={SignUpForm.SignUpForm}
            validationSchema={SignUpForm.validationSchema}
        />
    )
}

export default SignUp

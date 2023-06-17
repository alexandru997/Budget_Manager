import FormikWrapper from '../FormComponents'
import * as SingInForm from './SingInForm'

const SignIn = ({ onSubmit }) => {
    return (
        <FormikWrapper
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={onSubmit}
            Component={SingInForm.SingInForm}
            validationSchema={SingInForm.validationSchema}
        />
    )
}

export default SignIn

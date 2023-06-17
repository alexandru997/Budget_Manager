import { FormButton, InputValueField, Yup } from '../FormComponents'
import GoogleButton from '../GoogleButton'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Nu este un email valid')
        .required('Email este un camp obligator'),
    password: Yup.string()
        .min(6, 'Parola prea scurta - minim 6 caractere')
        .required('Parola este un camp obligator'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Parola nu coincide')
        .required('Confirmă Parola este un camp obligator'),
})

const SignUpForm = () => {
    return (
        <>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <InputValueField
                    name='email'
                    type='email'
                    placeholder='nume@domeniu.com'
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Parola</label>
                <InputValueField
                    name='password'
                    type='password'
                    placeholder='Parola'
                />
            </div>
            <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirmă Parola</label>
                <InputValueField
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirmă Parola'
                />
            </div>
            <div className='form-group mt-3'>
                <div className='col-sm-12'>
                    <FormButton text='ÎNREGISTREAZĂ-TE' />
                </div>
                <hr />
                <GoogleButton text='ÎNREGISTREAZĂ-TE CU GOOGLE' />
            </div>
        </>
    )
}

export { SignUpForm, validationSchema }

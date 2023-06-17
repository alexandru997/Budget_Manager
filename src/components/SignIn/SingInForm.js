import { FormButton, InputValueField, Yup } from '../FormComponents'
import GoogleButton from '../GoogleButton'
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Nu este un email valid')
        .required('Email este obligator'),
    password: Yup.string()
        .required('Parola este un câmp obligator')
        .min(6, 'Parola prea scurta - minim 6 caractere'),
})

const SingInForm = () => {
    return (
        <>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <InputValueField
                    name='email'
                    placeholder='nume@domeniu.com'
                    type='email'
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Parola</label>
                <InputValueField
                    name='password'
                    placeholder='Parola'
                    type='password'
                />
            </div>
            <div className='form-group mt-3'>
                <div className='col-sm-12'>
                    <FormButton text='INTRĂ' />
                </div>
                <hr />

                <GoogleButton text='INTRĂ CU GOOGLE' />
            </div>
        </>
    )
}

export { SingInForm, validationSchema }

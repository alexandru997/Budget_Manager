import { InputValueField, FormButton, Yup } from '../FormComponents'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Nu este un email valid')
        .required('Email este un camp obligator'),
})

const ResetPasswordForm = () => {
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
            <div className='col-sm-12 mt-4'>
                <FormButton text='Transmite Email' />
            </div>
        </>
    )
}

export { validationSchema, ResetPasswordForm }

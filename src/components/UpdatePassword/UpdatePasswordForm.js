import { useTheme } from '../../hooks'
import { FormButton, InputValueField, Yup } from '../FormComponents'
import { Title } from '../../components'

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, 'Parola prea scurta - minim 6 caractere')
        .required('Parola este un camp obligator'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Parola nu coincide')
        .required('Confirmă Parola este un camp obligator'),
})

const UpdatePasswordForm = () => {
    const { btnSecondary } = useTheme()
    return (
        <>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='newPassword'>
                        <Title text='Parola' />
                    </label>
                    <InputValueField
                        autocomplete='off'
                        name='newPassword'
                        type='password'
                        placeholder='Parola'
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='confirmPassword'>
                        <Title text='Confirmă Parola' />
                    </label>
                    <InputValueField
                        name='confirmPassword'
                        type='password'
                        placeholder='Confirmă Parola'
                    />
                </div>
            </div>
            <FormButton text='Salvează' />
            <FormButton type='reset' text='Anulează' color={btnSecondary} />
        </>
    )
}

export { UpdatePasswordForm, validationSchema }

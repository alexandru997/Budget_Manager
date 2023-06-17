import {
    FormButton,
    InputValueField,
    SelectorField,
    Yup,
} from '../FormComponents'
import { THEME_OPTIONS, CURRENCY_OPTIONS } from '../../constants'
import { Title } from '../Heading'
import { useTheme } from '../../hooks'

const validationSchema = Yup.object().shape({
    displayName: Yup.string().required('Valoarea e obligatorie'),
    theme: Yup.string()
        .required('Este o valoare obligatorie')
        .test(
            'is-category',
            'Valuta nu este suportata',
            option => THEME_OPTIONS[option]
        )
        .typeError('Nu este o categorie'),
    currency: Yup.string()
        .required('Este o valoare obligatorie')
        .test(
            'is-category',
            'Valuta nu este suportata',
            option => CURRENCY_OPTIONS[option]
        )
        .typeError('Nu este o categorie'),
})

const SettingsForm = () => {
    const { btnSecondary } = useTheme()
    return (
        <>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='displayName'>
                        <Title text='Numele de profil' />
                    </label>
                    <InputValueField
                        name='displayName'
                        type='text'
                        placeholder='Nume de profil'
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='theme'>
                        <Title text='Tema' />
                    </label>
                    <SelectorField name='theme' options={THEME_OPTIONS} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='currency'>
                        <Title text='Valuta' />
                    </label>
                    <SelectorField name='currency' options={CURRENCY_OPTIONS} />
                </div>
            </div>
            <FormButton text='Salvează' />
            <FormButton type='reset' text='Anulează' color={btnSecondary} />
        </>
    )
}

export { SettingsForm, validationSchema }

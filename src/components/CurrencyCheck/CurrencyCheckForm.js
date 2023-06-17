import { useField, useFormikContext } from 'formik'
import {
    FormButton,
    InputValueField,
    SelectorField,
    Yup,
} from '../FormComponents'
import { CURRENCY_OPTIONS as options } from '../../constants'
import { reverseIcon } from '../../icons/'
import { useTheme } from '../../hooks'

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
    base: Yup.string()
        .required('Este o valoare obligatorie')
        .test(
            'is-category',
            'Valuta nu este suportata',
            option => !!options[option]
        )
        .typeError('Nu este o categorie'),
    to: Yup.string()
        .required('Este o valoare obligatorie')
        .test(
            'is-category',
            'Valuta nu este suportata',
            option => options[option]
        )
        .typeError('Nu este o categorie'),
})

const CurrencyCheckForm = () => {
    const { setFieldValue, submitForm } = useFormikContext()
    const { btnFlipCurrency } = useTheme()
    const [base] = useField('base')
    const [to] = useField('to')

    const flip = async () => {
        try {
            const tmp = base.value
            setFieldValue(base.name, to.value)
            setFieldValue(to.name, tmp)
            await submitForm()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className='row'>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Valoare</label>
                    <InputValueField name='value' />
                </div>
                <div className='col-12 col-sm-3 mb-3'>
                    <label htmlFor='base'>Din</label>
                    <SelectorField name='base' options={options} />
                </div>
                <div className='col-12 col-sm-2 mb-3'>
                    <label>Schimbă</label>
                    <button
                        type='button'
                        className={`btn btn-block ${btnFlipCurrency} w-100`}
                        onClick={flip}
                    >
                        <img src={reverseIcon} alt='Flip currency' />
                    </button>
                </div>
                <div className='col-12 col-sm-3 mb-3'>
                    <label htmlFor='to'>În</label>
                    <SelectorField name='to' options={options} />
                </div>
            </div>
            <FormButton text='Calculează' />
        </>
    )
}

export { CurrencyCheckForm, validationSchema }

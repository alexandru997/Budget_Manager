import * as Yup from 'yup'
import { FormButton, InputValueField, SelectorField } from '../FormComponents'

const options = ['luni', 'ani']

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
    period: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('O valoare pozitivă')
        .integer('O valoare intreaga')
        .typeError('O valoare pozitivă'),
    type: Yup.string()
        .required('Categoria e obligatorie')
        .test(
            'is-category',
            'Valoarea nu este o categorie acceptata',
            option => !!options[parseInt(option)]
        )
        .typeError('Nu este o categorie'),
})

const CalculatorMonthlyFeeForm = () => {
    return (
        <>
            <div className='row'>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Valoare</label>
                    <InputValueField name='value' />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Perioada</label>
                    <InputValueField name='period' />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Tipul Perioadei</label>
                    <SelectorField name='type' options={options} />
                </div>
            </div>
            <FormButton text='Calculează' />
        </>
    )
}

export { validationSchema, CalculatorMonthlyFeeForm }

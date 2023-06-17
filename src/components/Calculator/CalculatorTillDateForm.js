import * as Yup from 'yup'
import { nextDay } from '../../utils'
import { DatePickerField, FormButton, InputValueField } from '../FormComponents'

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
    date: Yup.date()
        .min(
            nextDay(new Date()),
            'Data trebuie sa fie mai mare decat data de azi'
        )
        .typeError('Data greşită'),
})

const CalculatorTillDateForm = () => {
    return (
        <>
            <div className='row'>
                <div className='col-12 col-sm-6 mb-3'>
                    <label htmlFor='value'>Valoare</label>
                    <InputValueField name='value' />
                </div>
                <div className='col-12 col-sm-6 mb-3'>
                    <label htmlFor='date'>Data</label>
                    <DatePickerField name='date' />
                </div>
            </div>
            <FormButton text='Calculează' />
        </>
    )
}

export { validationSchema, CalculatorTillDateForm }

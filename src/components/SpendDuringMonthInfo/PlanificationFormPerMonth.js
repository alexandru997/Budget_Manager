import * as Yup from 'yup'
import { FormButton, InputValueField } from '../FormComponents'

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
})

const PlanificationFormPerMonth = () => {
    return (
        <>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor='value'>
                        Modifica valoarea planificat per lună
                    </label>
                    <InputValueField name='value' />
                </div>
            </div>
            <FormButton text='Salvează' />
        </>
    )
}

export { PlanificationFormPerMonth, validationSchema }

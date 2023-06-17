import {
    SelectorField,
    InputValueField,
    DatePickerField,
    TextAreaField,
    FormButton,
    Yup,
} from '../FormComponents'
import { nextDay } from '../../utils'
import { LANDD_CATEGORIES } from '../../constants'
import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks'

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
    description: Yup.string().max(
        280,
        'Numarul maxim de caractere este 280. Fii laconic ca in Twitter :)'
    ),
    date: Yup.date()
        .min(
            nextDay(new Date()),
            'Data trebuie sa fie mai mare decat data de azi'
        )
        .typeError('Data greşită'),
    category: Yup.string()
        .required('Categoria e obligatorie')
        .test(
            'is-category',
            'Valoarea nu este o categorie acceptata',
            option => LANDD_CATEGORIES[option]
        )
        .typeError('Nu este o categorie'),
})

const LoansAndDebtsForm = ({ formType = 'CREATE' }) => {
    const { btnSecondary } = useTheme()
    const formRef = useRef(null)
    useEffect(() => {
        if (formType === 'UPDATE') {
            formRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [formType])
    return (
        <>
            <div ref={formRef} className='row'>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='category'>Categoria</label>
                    <SelectorField name='category' options={LANDD_CATEGORIES} />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Valoare</label>
                    <InputValueField name='value' />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='date'>Data Limită</label>
                    <DatePickerField name='date' />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 mb-3'>
                    <label htmlFor='description'>Descriere</label>
                    <TextAreaField name='description' />
                </div>
            </div>
            <FormButton text='Salvează' color='btn-primary' />
            {formType === 'UPDATE' && (
                <FormButton type='reset' text='Anulează' color={btnSecondary} />
            )}
        </>
    )
}

export { validationSchema, LoansAndDebtsForm }

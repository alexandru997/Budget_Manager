import { useEffect, useMemo, useRef } from 'react'
import * as Yup from 'yup'
import {
    SelectorField,
    DatePickerField,
    InputValueField,
    FormButton,
} from '../FormComponents'
import { COSTS } from '../../constants'
import { isRevenue, isRevenueOrSpent } from '../../utils'
import { useTheme } from '../../hooks'

const validationSchema = Yup.object().shape({
    value: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
    date: Yup.date().typeError('Data greşită'),
    to: Yup.string()
        .required('Categoria e obligatorie')
        .test('is-category', 'Valoarea nu este o categorie acceptata', to => {
            return Object.keys(COSTS)
                .filter(cost => isRevenueOrSpent({ to: cost }))
                .includes(to)
        })
        .typeError('Nu este o categorie'),
})

const TransactionForm = ({ formType = 'CREATE' }) => {
    const _COSTS = useMemo(() => {
        const options = {}
        Object.keys(COSTS)
            .filter(cost => isRevenueOrSpent({ to: cost }))
            .forEach(cost => {
                if (isRevenue({ to: cost })) {
                    options[cost] = `(+) ${COSTS[cost]} `
                } else {
                    options[cost] = `(-) ${COSTS[cost]}`
                }
            })
        return options
    }, [])
    const formRef = useRef(null)
    const { btnSecondary } = useTheme()
    useEffect(() => {
        if (formType === 'UPDATE') {
            formRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [formType])
    return (
        <>
            <div ref={formRef} className='row'>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='to'>Categoria</label>
                    <SelectorField name='to' options={_COSTS} />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='value'>Valoare</label>
                    <InputValueField name='value' />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='date'>Data</label>
                    <DatePickerField name='date' />
                </div>
            </div>
            <FormButton text='Salvează' color='btn-primary' />
            {formType === 'UPDATE' && (
                <FormButton type='reset' text='Anulează' color={btnSecondary} />
            )}
        </>
    )
}

export { validationSchema, TransactionForm }
export default TransactionForm

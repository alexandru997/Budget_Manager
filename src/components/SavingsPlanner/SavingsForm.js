import { useEffect, useRef } from 'react'
import { InputValueField, FormButton, Yup } from '../FormComponents'
import { useTheme } from '../../hooks'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Valoarea e obligatorie')
        .max(20, 'Numarul maxim de caractere este 20'),
    initValue: Yup.number()
        .required('Valoarea e obligatorie')
        .test(
            'Is positive?',
            'Trebuie sa fie un numar mai mare ca 0',
            value => value >= 0
        )
        .typeError('Trebuie sa fie un numar mai mare ca 0'),
    targetValue: Yup.number()
        .required('Valoarea e obligatorie')
        .positive('Trebuie sa fie un numar pozitiv')
        .typeError('Trebuie sa fie un numar pozitiv'),
})

const SavingsForm = ({ formType = 'CREATE' }) => {
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
                    <label htmlFor='name'>Obiectiv propus</label>
                    <InputValueField
                        name='name'
                        type='text'
                        placeholder='Obiectiv propus'
                    />
                </div>
                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='initValue'>Valoare Curenta</label>
                    <InputValueField
                        name='initValue'
                        placeholder='Valoarea Curenta'
                    />
                </div>

                <div className='col-12 col-sm-4 mb-3'>
                    <label htmlFor='targetValue'>Valoarea Planificata</label>
                    <InputValueField
                        name='targetValue'
                        placeholder='Valoarea Planificata'
                    />
                </div>
            </div>
            <FormButton text='Salvează' color='btn-primary' />
            {formType === 'UPDATE' && (
                <FormButton type='reset' text='Anulează' color={btnSecondary} />
            )}
        </>
    )
}

export { SavingsForm, validationSchema }

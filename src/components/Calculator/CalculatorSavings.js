import FormikWrapper from '../FormComponents'
import { useSettings } from '../../context'
import * as CalculatorMonthlyFeeForm from './CalculatorMonthlyFeeForm'
import { financial } from '../../utils'

const CalculatorSavings = ({ setAmount }) => {
    const { currency } = useSettings()
    return (
        <>
            <p className='text-muted'>
                Iţi permite calcularea valorii de bani salvate timp de perioada
                indicată.
            </p>
            <p className='text-muted'>
                (Ex. caţi bani salvezi dacă depui la o parte 50 {currency} pe
                lună)
            </p>
            <FormikWrapper
                initialValues={{
                    value: '',
                    period: 1,
                    type: '0',
                }}
                onSubmit={({ value, period, type }) => {
                    const months = type === '0' ? period : period * 12

                    setAmount(financial(value * months))
                }}
                Component={CalculatorMonthlyFeeForm.CalculatorMonthlyFeeForm}
                validationSchema={CalculatorMonthlyFeeForm.validationSchema}
            />
        </>
    )
}

export default CalculatorSavings

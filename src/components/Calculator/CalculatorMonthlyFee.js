import FormikWrapper from '../FormComponents'
import * as CalculatorMonthlyFeeForm from './CalculatorMonthlyFeeForm'
import { financial } from '../../utils'

const CalculatorMonthlyFee = ({ setAmount }) => {
    return (
        <>
            <p className='text-muted'>
                Iţi permite calcularea valorii de bani ce trebuie salvata pentru
                pentru a acumula suma propusă timp de perioada indicată
            </p>
            <FormikWrapper
                initialValues={{
                    value: '',
                    period: 1,
                    type: '0',
                }}
                onSubmit={({ value, period, type }) => {
                    const months = type === '0' ? period : period * 12

                    setAmount(financial(value / months))
                }}
                Component={CalculatorMonthlyFeeForm.CalculatorMonthlyFeeForm}
                validationSchema={CalculatorMonthlyFeeForm.validationSchema}
            />
        </>
    )
}

export default CalculatorMonthlyFee

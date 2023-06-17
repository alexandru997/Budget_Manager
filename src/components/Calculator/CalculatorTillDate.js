import FormikWrapper from '../FormComponents'
import * as CalculatorTillDateForm from './CalculatorTillDateForm'
import { daysBetweenDates, financial, nextDay } from '../../utils'

const CalculatorTillDate = ({ setAmount }) => {
    return (
        <>
            <p className='text-muted'>
                Iţi permite calcularea valorii de bani ce trebuie salvata
                zilinic pentru a acumula valoarea indicată până la data
                inidicată.
            </p>
            <FormikWrapper
                initialValues={{
                    value: '',
                    date: nextDay(new Date()),
                }}
                onSubmit={({ value, date }) => {
                    setAmount(
                        financial(value / daysBetweenDates(new Date(), date))
                    )
                }}
                Component={CalculatorTillDateForm.CalculatorTillDateForm}
                validationSchema={CalculatorTillDateForm.validationSchema}
            />
        </>
    )
}

export default CalculatorTillDate

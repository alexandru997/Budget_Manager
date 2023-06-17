import FormikWrapper from '../FormComponents'
import * as LoansAndDebtsForm from './LoansAndDebtsForm'
import { nextDay } from '../../utils'
import { Title } from '../Heading'
import { useLonasAndDebts } from '../../context'
import LoanAndDebtsTable from './LoanAndDebtsTable'

const LoansAndDebts = () => {
    const { createRecord } = useLonasAndDebts()
    const initialValues = {
        category: 'Loans',
        value: '',
        date: nextDay(new Date()),
        description: '',
    }
    const onSubmit = (fields, { resetForm }) => {
        createRecord(
            fields.category,
            parseFloat(fields.value),
            fields.date,
            fields.description
        )
        resetForm({ values: initialValues })
    }
    return (
        <>
            <Title text='Înregistrează' />
            <FormikWrapper
                initialValues={initialValues}
                onSubmit={onSubmit}
                Component={LoansAndDebtsForm.LoansAndDebtsForm}
                validationSchema={LoansAndDebtsForm.validationSchema}
            />
            <LoanAndDebtsTable />
        </>
    )
}

export default LoansAndDebts

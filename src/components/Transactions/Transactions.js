import { useTransactionData } from '../../context'
import FormikWrapper from '../FormComponents'
import { Title } from '../Heading'
import * as TransactionForm from './TransactionForm'
import TransactionsTable from './TransactionsTable'
import { REVENUE_OPTIONS } from '../../constants'

const Transactions = () => {
    const { createTransaction } = useTransactionData()
    const onSubmit = (fields, { resetForm }) => {
        createTransaction(fields.to, parseFloat(fields.value), fields.date)
        resetForm({ values: initialValues })
    }
    const initialValues = {
        to: REVENUE_OPTIONS[0],
        value: '',
        date: new Date(),
    }
    return (
        <>
            <Title text='Înregistrează' />
            <FormikWrapper
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={TransactionForm.validationSchema}
                Component={TransactionForm.TransactionForm}
            />
            <TransactionsTable />
        </>
    )
}

export default Transactions

import { useSavingsData } from '../../context'
import FormikWrapper from '../FormComponents'
import * as SavingsForm from './SavingsForm'
import Heading from '../Heading'
import SavingsTable from './SavingsTable'

const SavingsPlanner = () => {
    const { createSavings } = useSavingsData()

    const initialValues = {
        name: '',
        initValue: '',
        targetValue: '',
    }
    const onSubmit = ({ name, initValue, targetValue }, { resetForm }) => {
        createSavings(name, initValue, targetValue)
        resetForm()
    }
    return (
        <>
            <Heading text='Economii' />
            <FormikWrapper
                initialValues={initialValues}
                onSubmit={onSubmit}
                Component={SavingsForm.SavingsForm}
                validationSchema={SavingsForm.validationSchema}
            />
            <SavingsTable />
        </>
    )
}

export default SavingsPlanner

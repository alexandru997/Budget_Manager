import InfoCards from '../InfoCards'
import { Title } from '../Heading'
import FormikWrapper from '../FormComponents'
import * as PlanificationFormPerMonth from './PlanificationFormPerMonth'
import { useSettings } from '../../context'

const SpentDuringMonthInfo = () => {
    const { plannedToBeSpent, changePlannedToBeSpent } = useSettings()

    return (
        <>
            <Title text='Cheltuieli' />
            <InfoCards keys={['PLANNED_TO_BE_SPENT', 'THIS_MONTH_SPENT']} />
            <Title text='Ramas' />
            <InfoCards
                keys={['DIFFERENCE_BETWEEN_PLANNED_TO_BE_SPENT_AND_SPENT']}
            />
            <Title text='Posibil' />
            <InfoCards keys={['TO_BE_SPENT_DAILY']} />
            {/* <Title text='Modifica valoarea planificat per lună' /> */}
            <FormikWrapper
                initialValues={{
                    value: plannedToBeSpent,
                }}
                onSubmit={({ value }) => {
                    changePlannedToBeSpent(value)
                }}
                Component={PlanificationFormPerMonth.PlanificationFormPerMonth}
                validationSchema={PlanificationFormPerMonth.validationSchema}
            />
        </>
    )
}

export default SpentDuringMonthInfo

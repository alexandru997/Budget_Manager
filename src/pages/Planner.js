import { lazy } from 'react'
import { Heading, SuspenseComponent } from '../components'
import { SavingsProvider } from '../context'

const Calculator = lazy(() => import('../components/Calculator'))
const SpentDuringMonthInfo = lazy(() =>
    import('../components/SpendDuringMonthInfo')
)
const SavingsPlanner = lazy(() => import('../components/SavingsPlanner'))

const Planner = () => {
    return (
        <>
            <Heading text='Planificator' />
            <SuspenseComponent>
                <SpentDuringMonthInfo />
                <SavingsProvider>
                    <SavingsPlanner />
                </SavingsProvider>
                <Calculator />
            </SuspenseComponent>
        </>
    )
}

export default Planner

import { lazy } from 'react'
import Heading from '../components/Heading'
import SuspenseComponent from '../components/SuspenseComponent'
import { LoansAndDebtsProvider } from '../context'

const LoansAndDebts = lazy(() => import('../components/LoansAndDebts'))

const LoansAndDebtsPage = () => {
    return (
        <>
            <Heading text='Împrumuturi şi Datorii' />
            <SuspenseComponent>
                <LoansAndDebtsProvider>
                    <LoansAndDebts />
                </LoansAndDebtsProvider>
            </SuspenseComponent>
        </>
    )
}

export default LoansAndDebtsPage

import { lazy } from 'react'
import {
    InfoCards,
    Heading,
    Title,
    SuspenseComponent
} from '../components'

const Transactions = lazy(() => import('../components/Transactions'))

const Wallet = () => {
    return (
        <>
            <Heading text="Portofel" />
            <Title text="Cheltuit" />
            <InfoCards keys={[
                'OVERALL_SPENT',
                'THIS_MONTH_SPENT',
                'THIS_YEAR_SPENT',
                'THIS_WEEK_SPENT'
            ]} />
            <Title text="Venit" />
            <InfoCards keys={[
                'OVERALL_REVENUE',
                'THIS_MONTH_REVENUE',
                'THIS_YEAR_REVENUE',
                'THIS_WEEK_REVENUE'
            ]} />
            <SuspenseComponent>
                <Transactions />
            </SuspenseComponent>
        </>
    )
}

export default Wallet

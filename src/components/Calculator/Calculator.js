import { lazy, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Heading from '../Heading'
import InfoCard from '../InfoCard'
import { NavigationLinks, SuspenseComponent } from '../../components'

const CalculatorMonthlyFee = lazy(() => import('./CalculatorMonthlyFee'))
const CalculatorTillDate = lazy(() => import('./CalculatorTillDate'))
const CalculatorSavings = lazy(() => import('./CalculatorSavings'))

const ROUTES = [
    {
        key: 'PERIOD',
        exact: true,
        name: 'Perioadă',
        path: '/planner',
        component: CalculatorMonthlyFee,
    },
    {
        key: 'TILL_DAY',
        name: 'Data',
        path: '/planner/till-day',
        component: CalculatorTillDate,
    },
    {
        key: 'SAVE_DURING_YEAR',
        name: 'Economii',
        path: '/planner/save-during-year',
        component: CalculatorSavings,
    },
]

const Calculator = () => {
    const [amount, setAmount] = useState(0)
    return (
        <>
            <Heading text='Calculator' />
            <NavigationLinks routes={ROUTES} />
            <div className='col-sm'>
                <InfoCard
                    title='Valoarea calculata'
                    calcFunc={() => amount}
                    color='bg-c-blue'
                />
            </div>
            <SuspenseComponent>
                <Switch>
                    {ROUTES.map(route => (
                        <Route
                            key={route.key}
                            path={route.path}
                            exact={route.exact}
                            render={() => (
                                <route.component setAmount={setAmount} />
                            )}
                        />
                    ))}
                    <Redirect to='/planner' />
                </Switch>
            </SuspenseComponent>
        </>
    )
}

export default Calculator

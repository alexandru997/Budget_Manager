import { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
    InfoCards,
    Heading,
    Title,
    SuspenseComponent,
    NavigationLinks,
} from '../components'

const GeneralCurve = lazy(() => import('../components/GeneralCurve'))
const LastActivities = lazy(() => import('../components/LastActivities'))
const TransactionPipeCharts = lazy(() =>
    import('../components/TransactionPipeCharts')
)

const ROUTES = [
    {
        key: 'GENERAL_CURVE',
        exact: true,
        name: 'General',
        path: '/home',
        component: GeneralCurve,
    },
    {
        key: 'MONTHLY_PIPE_CHART',
        name: 'Lunar',
        path: '/home/monthly-spet-pipe-chart',
        component: () => (
            <TransactionPipeCharts keys={['MONTHLY_PIPE_CHART']} />
        ),
    },
    {
        key: 'YEARLY_PIPE_CHART',
        name: 'Anual',
        path: '/home/yearly-spet-pipe-chart',
        component: () => <TransactionPipeCharts keys={['YEARLY_PIPE_CHART']} />,
    },
]

const Home = () => {
    return (
        <>
            <Heading text='Panou de control' />
            <InfoCards keys={['SPENT', 'BALANCE', 'REVENIU']} />
            <Title text='Planificat' />
            <InfoCards keys={['TO_BE_SPENT_DAILY']} />
            <NavigationLinks routes={ROUTES} />
            <SuspenseComponent>
                <Switch>
                    {ROUTES.map(route => (
                        <Route
                            key={route.key}
                            path={route.path}
                            exact={route.exact}
                            render={() => <route.component />}
                        />
                    ))}
                    <Redirect to='/home' />
                </Switch>
                <LastActivities />
            </SuspenseComponent>
        </>
    )
}

export default Home

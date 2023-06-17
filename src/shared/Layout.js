import { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NavigationBar, SuspenseComponent } from '../components'
import { useSettings } from '../context'
import { useMediaQuery, useTheme } from '../hooks'
import {
    homeSvg,
    walletSvg,
    plannerSvg,
    ladSvg,
    currencyCheckSvg,
    settingsSvg,
} from '../icons'

const Home = lazy(() => import('../pages/Home'))
const Wallet = lazy(() => import('../pages/Wallet'))
const Settings = lazy(() => import('../pages/Settings'))
const Planner = lazy(() => import('../pages/Planner'))
const LoansAndDebts = lazy(() => import('../pages/LoansAndDebtsPage'))
const Currency = lazy(() => import('../pages/Currency'))
const NewUserSettings = lazy(() => import('../pages/NewUserSettings'))

const ROUTES = [
    {
        key: 'HOME',
        name: 'Acasă',
        logo: homeSvg,
        path: '/home',
        component: Home,
    },
    {
        key: 'WALLET',
        name: 'Portofel',
        logo: walletSvg,
        path: '/wallet',
        component: Wallet,
    },
    {
        key: 'Planner',
        name: 'Planificator',
        logo: plannerSvg,
        path: '/planner',
        component: Planner,
    },
    {
        key: 'LOANS_AND_DEBTS',
        name: 'Împrumuturi şi Datorii',
        logo: ladSvg,
        path: '/loans-and-debts',
        component: LoansAndDebts,
    },
    {
        key: 'CURRENCY_CHEKC',
        name: 'Schimb valutar',
        logo: currencyCheckSvg,
        path: '/currency-check',
        component: Currency,
    },
    {
        key: 'SETTINGS',
        name: 'Setări',
        logo: settingsSvg,
        path: '/settings',
        component: Settings,
    },
]

const Layout = () => {
    const isPageWide = useMediaQuery('(min-width: 1200px)')
    const { isNewUser } = useSettings()
    const { bg, bgColor, bgColorNotWide, textColor } = useTheme()
    if (isNewUser) {
        return (
            <div
                className={`${
                    isPageWide ? 'shadow-lg mt-3 rounded-5' : ''
                } main-layout container p-4 ${textColor}`}
                style={{
                    backgroundColor: isPageWide ? bgColor : bgColorNotWide,
                }}
            >
                <SuspenseComponent>
                    <NewUserSettings />
                </SuspenseComponent>
            </div>
        )
    }
    return (
        <div
            className={`${
                isPageWide
                    ? 'shadow-lg mt-3 rounded-5 container p-4'
                    : 'container-fluid'
            } main-layout ${textColor}`}
            style={{ backgroundColor: isPageWide ? bgColor : bgColorNotWide }}
        >
            <div className='row'>
                <div className='col-sm-12 col-xl-3'>
                    <NavigationBar routes={ROUTES} />
                </div>
                <div className='col-sm-12 col-xl-9'>
                    <div
                        className={
                            isPageWide
                                ? `shadow-lg rounded-5 p-3 container-fluid ${bg}`
                                : ''
                        }
                    >
                        <div className='row d-flex justify-content-center'>
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
                            </SuspenseComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout

import { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { WelcomeNavigationBar, SuspenseComponent } from '../components'

const Welcome = lazy(() => import('../pages/Welcome'))
const SignInPage = lazy(() => import('../pages/SignInPage'))
const SignUpPage = lazy(() => import('../pages/SignUpPage'))
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'))

const ROUTES = [
    {
        key: 'WELCOME',
        exact: true,
        path: '/',
        component: Welcome,
    },
    {
        key: 'SIGN_IN',
        path: '/sign-in',
        component: SignInPage,
    },
    {
        key: 'SIGN_UP',
        path: '/sign-up',
        component: SignUpPage,
    },
    {
        key: 'RESET_PASS',
        path: '/reset-password',
        component: ResetPasswordPage,
    },
]

const WelcomeLayout = () => {
    return (
        <>
            <div className='bg-c-red' style={{ minHeight: '100vh' }}>
                <div className='container'>
                    <WelcomeNavigationBar />
                    <div className='container text-white d-flex flex-column p-5 mt-4'>
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
                                <Redirect to='/' />
                            </Switch>
                        </SuspenseComponent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomeLayout

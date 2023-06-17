import { lazy, useState } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import {
    Heading,
    NavigationLinks,
    SuspenseComponent,
    Alert,
} from '../components'
import { useTheme } from '../hooks'

const SettingsComponent = lazy(() => import('../components/SettingsComponent'))

const UpdatePassword = lazy(() => import('../components/UpdatePassword'))

const ROUTES = [
    {
        key: 'PROFILE',
        exact: true,
        name: 'Profil',
        path: '/settings',
        component: SettingsComponent,
    },
    {
        key: 'CHANGE_PASSWORD',
        name: 'Parola',
        path: '/settings/password',
        component: UpdatePassword,
    },
]

const Settings = () => {
    const { alertSuccess } = useTheme()
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const onSuccess = text => {
        setSuccess(text)
        setError(null)
    }

    const onError = text => {
        setError(text)
        setSuccess(null)
    }
    return (
        <>
            <Heading text='Setări' />
            {success && <Alert message={success} type={alertSuccess} />}
            {error && <Alert message={error} />}
            <SuspenseComponent>
                <NavigationLinks routes={ROUTES} />
                <SuspenseComponent>
                    <Switch>
                        {ROUTES.map(route => (
                            <Route
                                key={route.key}
                                path={route.path}
                                exact={route.exact}
                                render={() => (
                                    <route.component
                                        onSuccess={onSuccess}
                                        onError={onError}
                                    />
                                )}
                            />
                        ))}
                        <Redirect to='/settings' />
                    </Switch>
                </SuspenseComponent>
            </SuspenseComponent>
        </>
    )
}
export default Settings

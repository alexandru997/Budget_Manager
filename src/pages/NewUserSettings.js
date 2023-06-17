import { lazy, useState } from 'react'
import { Heading, SuspenseComponent } from '../components'
import { useAuth, useSettings } from '../context'

const SettingsComponent = lazy(() => import('../components/SettingsComponent'))

const NewUserSettings = () => {
    const { clearSession } = useAuth()
    const { changeSettings } = useSettings()
    const [displayName] = useState(
        (localStorage.getItem('displayName') || '').trim()
    )
    const onSubmit = ({ displayName, theme, currency }) => {
        changeSettings({
            displayName: displayName.trim(),
            theme,
            currency,
            plannedSpent: 0,
            isNewUser: false,
        })
        localStorage.removeItem('displayName')
    }
    const onReset = () => {
        localStorage.removeItem('displayName')
        clearSession()
    }

    return (
        <>
            <Heading text='Salut, hai să setăm profilul tău!' />
            <SuspenseComponent>
                <SettingsComponent
                    theme='dark'
                    currency='EUR'
                    displayName={displayName}
                    onSubmit={onSubmit}
                    onReset={onReset}
                />
            </SuspenseComponent>
        </>
    )
}

export default NewUserSettings

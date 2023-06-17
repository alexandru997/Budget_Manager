import { useSettings } from '../../context'
import { FormikWrapper } from '../FormComponents'
import { Spinner } from '../../components'
import * as SettingsForm from './SettingsForm'
import { noop } from '../../utils'

const Settings = ({ onSuccess = noop, onSubmit, onReset }) => {
    const { theme, currency, displayName, changeSettings, loading } =
        useSettings()

    const _onSubmit = ({ displayName, theme, currency }) => {
        changeSettings({ displayName: displayName.trim(), theme, currency })
        onSuccess('Salvat.')
    }

    const _onReset = ({ displayName, theme, currency }) => {
        changeSettings({ displayName: displayName.trim(), theme, currency })
        onSuccess(null)
    }

    return (
        <>
            {!loading ? (
                <FormikWrapper
                    initialValues={{
                        displayName,
                        theme,
                        currency,
                    }}
                    onSubmit={onSubmit || _onSubmit}
                    onReset={onReset || _onReset}
                    validationSchema={SettingsForm.validationSchema}
                    Component={SettingsForm.SettingsForm}
                />
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default Settings

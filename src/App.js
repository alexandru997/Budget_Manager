import { Layout, WelcomeLayout } from './shared'
import { DataProvider, SettingsPrivider, useAuth } from './context'

const App = () => {
    const auth = useAuth()

    return auth.isAuthenticated ? (
        <DataProvider>
            <SettingsPrivider>
                <Layout />
            </SettingsPrivider>
        </DataProvider>
    ) : (
        <WelcomeLayout />
    )
}

export default App

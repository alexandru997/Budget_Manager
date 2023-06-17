import { createContext, useContext } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { Spinner } from '../components'
import { firestore } from '../firebase'
import { useAuth } from './auth'

const settingsContext = createContext()

const useSettings = () => {
    return useContext(settingsContext)
}

const SettingsPrivider = ({ children }) => {
    const { user } = useAuth()
    const settingsRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('general')
        .doc('profile')
    const [settings, loading, error] = useDocument(settingsRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    const changeSettings = async settings => {
        await settingsRef.set(settings, { merge: true })
    }

    const changePlannedToBeSpent = async value => {
        await settingsRef.update({ plannedSpent: value })
    }

    if (loading) {
        return (
            <div className='mt-3'>
                <Spinner />
            </div>
        )
    }

    const isNewUser =
        typeof settings?.data()?.isNewUser === 'undefined' ||
        settings.data().isNewUser

    return (
        <settingsContext.Provider
            value={{
                isNewUser: isNewUser,
                currency: settings.data()?.currency || 'EUR',
                plannedToBeSpent: settings.data()?.plannedSpent || 0,
                theme: settings.data()?.theme || 'light',
                displayName: settings.data()?.displayName || '',
                loading,
                error,
                changeSettings,
                changePlannedToBeSpent,
            }}
        >
            {children}
        </settingsContext.Provider>
    )
}

export { useSettings }

export default SettingsPrivider

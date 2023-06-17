import { createContext, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { useAuth } from './auth'

const loansAndDebts = createContext()

const useLonasAndDebts = () => {
    return useContext(loansAndDebts)
}

const LoansAndDebtsProvider = ({ children }) => {
    const { user } = useAuth()
    const dataRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('lad')
    const [data, loading, error] = useCollectionData(dataRef, {
        idField: 'id',
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const createRecord = async (category, value, date, description) => {
        try {
            const newRecord = {
                category,
                value,
                description,
                date: date.toISOString(),
                isVisible: true,
            }
            await dataRef.add(newRecord)
        } catch (e) {
            console.log(e)
        }
    }

    const updateRecord = async (id, category, value, date, description) => {
        try {
            const newRecord = {
                category,
                value,
                date: date.toISOString(),
                description,
            }
            await dataRef.doc(id).update(newRecord)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteRecord = async id => {
        try {
            await dataRef.doc(id).delete()
        } catch (e) {
            console.log(e)
        }
    }

    const toggleHide = async id => {
        const ladData = await dataRef.doc(id).get()
        const newRecord = {
            isVisible: !ladData.data().isVisible,
        }
        await dataRef.doc(id).update(newRecord)
    }

    return (
        <loansAndDebts.Provider
            value={{
                data: data || [],
                loading,
                error,
                createRecord,
                updateRecord,
                deleteRecord,
                toggleHide,
            }}
        >
            {children}
        </loansAndDebts.Provider>
    )
}

export { useLonasAndDebts }
export default LoansAndDebtsProvider

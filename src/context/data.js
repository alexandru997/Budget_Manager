import { createContext, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { useAuth } from './auth'

const dataContext = createContext()

const useTransactionData = () => {
    return useContext(dataContext)
}

const DataProvider = ({ children }) => {
    const { user } = useAuth()
    const dataRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('data')
    const [data, loading, error] = useCollectionData(dataRef, {
        idField: 'id',
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    const createTransaction = async (to, value, date) => {
        try {
            const newTransaction = {
                to,
                value,
                date: date.toISOString(),
            }
            const docRef = await dataRef.add(newTransaction)
            return docRef.id
        } catch (e) {
            console.log(e)
        }
    }

    const updateTransaction = async (id, to, value, date) => {
        try {
            const updatedTransaction = {
                to,
                value,
                date: date.toISOString(),
            }
            dataRef.doc(id).update(updatedTransaction)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteTransaction = async id => {
        try {
            await dataRef.doc(id).delete()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <dataContext.Provider
            value={{
                data: data || [],
                loading,
                error,
                createTransaction,
                updateTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </dataContext.Provider>
    )
}

export { useTransactionData }

export default DataProvider

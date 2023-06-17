import { createContext, useContext, useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { useAuth } from './auth'
import { useTransactionData } from './data'

const savingsContext = createContext()

const useSavingsData = () => useContext(savingsContext)

const SavingsProvider = ({ children }) => {
    const { user } = useAuth()
    const transactions = useTransactionData()
    const dataRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('savings')

    const [data, loading] = useCollectionData(dataRef, {
        idField: 'id',
        snapshotListenOptions: {
            includeMetadataChanges: true,
        },
    })

    const savings = useMemo(() => {
        if (loading) {
            return []
        }
        return data
            .map(s => {
                const targetTransaction = transactions.data.find(
                    transactions => transactions.id === s.refTransactionId
                )
                if (targetTransaction) {
                    return {
                        ...s,
                        initValue: targetTransaction.value,
                    }
                } else {
                    return undefined
                }
            })
            .filter(Boolean)
    }, [data, loading, transactions.data])

    const createSavings = async (name, initValue, targetValue) => {
        try {
            const refTransactionId = await transactions.createTransaction(
                'Savings',
                initValue,
                new Date()
            )
            const newSavings = {
                name,
                targetValue,
                refTransactionId,
                isVisible: true,
            }

            await dataRef.add(newSavings)
        } catch (e) {
            console.log(e)
        }
    }

    const updateSavings = async (id, name, initValue, targetValue) => {
        try {
            const savingsData = await dataRef.doc(id).get()

            await transactions.updateTransaction(
                savingsData.data().refTransactionId,
                'Savings',
                initValue,
                new Date()
            )

            const updatedSavingsData = {
                name,
                targetValue,
            }

            await dataRef.doc(id).update(updatedSavingsData)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSavings = async savingsId => {
        const savingsData = await dataRef.doc(savingsId).get()
        await dataRef.doc(savingsId).delete()
        await transactions.deleteTransaction(
            savingsData.data().refTransactionId
        )
    }

    const toggleHide = async savingsId => {
        const savingsData = await dataRef.doc(savingsId).get()
        const updatedSavingsData = {
            isVisible: !savingsData.data().isVisible,
        }
        await dataRef.doc(savingsId).update(updatedSavingsData)
    }

    return (
        <savingsContext.Provider
            value={{
                data: savings,
                createSavings,
                updateSavings,
                deleteSavings,
                toggleHide,
            }}
        >
            {children}
        </savingsContext.Provider>
    )
}

export { useSavingsData }

export default SavingsProvider

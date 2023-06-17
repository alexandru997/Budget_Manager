import { useMemo, useState } from 'react'
import { useSettings, useTransactionData } from '../../context'
import { COSTS } from '../../constants'
import * as TransactionForm from './TransactionForm'
import { useMediaQuery } from '../../hooks'
import { getDateFormatted, isRevenue, isRevenueOrSpent } from '../../utils'
import { deleteIcon } from '../../icons'
import { editIcon } from '../../icons'
import Table from '../Table'

const TransactionsTable = () => {
    const [editableRowId, setEditableRowId] = useState(null)
    const [deleteRowId, setDeleteRowId] = useState(null)
    const isPageWide = useMediaQuery('(min-width: 576px)')
    const { data, deleteTransaction, updateTransaction } = useTransactionData()
    const { currency } = useSettings()
    const columns = useMemo(
        () => [
            {
                key: 'TO',
                title: 'SPRE',
                dataIndex: 'to',
                render: (_, record) => COSTS[record.to],
            },
            {
                key: 'VALUE',
                title: 'VALOARE',
                dataIndex: 'value',
                render: (text, record) => (
                    <div className='d-flex justify-content-end w-75'>
                        <span
                            className={
                                isRevenue(record)
                                    ? 'text-success'
                                    : 'text-danger'
                            }
                        >
                            {isRevenue(record) ? '+' + text : '-' + text}{' '}
                            {currency}
                        </span>
                    </div>
                ),
            },
            {
                key: 'DATE',
                title: 'DATA',
                dataIndex: 'date',
                render: text => getDateFormatted(new Date(text)),
            },
            {
                key: 'ACTIONS',
                title: 'ACŢIUNI',
                dataIndex: '',
                render: (_, record) => (
                    <div
                        className={`btn-group${
                            !isPageWide ? '-vertical' : ''
                        } btn-group-sm`}
                        role='group'
                        aria-label='Basic mixed styles example'
                    >
                        <button
                            type='button'
                            className='btn btn-outline-warning'
                            style={{ width: '35px' }}
                            onClick={() => setEditableRowId(record.id)}
                        >
                            <img src={editIcon} alt='Edit' />
                        </button>
                        <button
                            type='button'
                            className='btn btn-outline-danger'
                            style={{ width: '35px' }}
                            onClick={() => setDeleteRowId(record.id)}
                        >
                            <img src={deleteIcon} alt='Delete' />
                        </button>
                    </div>
                ),
            },
        ],
        [isPageWide, currency]
    )
    const dataSource = useMemo(() => {
        return data
            .filter(isRevenueOrSpent)
            .map(transaction => {
                return {
                    key: `${transaction.id}`,
                    ...transaction,
                }
            })
            .sort((a, b) =>
                new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
            )
    }, [data])

    const onSubmit = fields => {
        updateTransaction(
            editableRowId,
            fields.to,
            parseFloat(fields.value),
            fields.date
        )
        setEditableRowId(null)
    }

    const onReset = () => setEditableRowId(null)

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            editableRowId={editableRowId}
            onSubmit={onSubmit}
            onReset={onReset}
            Component={TransactionForm.TransactionForm}
            validationSchema={TransactionForm.validationSchema}
            mapRowToInitialValues={({ to, value, date }) => ({
                to,
                value,
                date: new Date(date),
            })}
            confirmRowId={deleteRowId}
            onOk={deleteTransaction}
            onCancel={() => setDeleteRowId(null)}
            confimrMessage='Doriţi să ştergeţi înregistrarea?'
        />
    )
}

export default TransactionsTable

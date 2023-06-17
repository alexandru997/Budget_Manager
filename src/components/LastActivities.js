import { useMemo } from 'react'
import { useSettings, useTransactionData } from '../context'
import { COSTS } from '../constants'
import { isCurrentDay, isRevenue, isRevenueOrSpent } from '../utils'
import { Title } from './Heading'
import Table from './Table'
const LastActivities = () => {
    const { currency } = useSettings()
    const { data } = useTransactionData()
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
                    <span
                        className={
                            'd-flex justify-content-between ' +
                            (isRevenue(record) ? 'text-success' : 'text-danger')
                        }
                    >
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
                        {isRevenue(record) ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z'
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z'
                                />
                            </svg>
                        )}
                    </span>
                ),
            },
        ],
        [currency]
    )
    const dataSource = useMemo(
        () =>
            data
                .filter(
                    transaction =>
                        isRevenueOrSpent(transaction) &&
                        isCurrentDay(new Date(transaction.date))
                )
                .map(transaction => ({
                    key: transaction.id,
                    ...transaction,
                })),
        [data]
    )

    return (
        <>
            <Title text='Activități recente' />
            <Table columns={columns} dataSource={dataSource} />
        </>
    )
}

export default LastActivities

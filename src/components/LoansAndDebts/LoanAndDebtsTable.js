import { useMemo, useState } from 'react'
import * as LoansAndDebtsForm from './LoansAndDebtsForm'
import { useLonasAndDebts, useSettings } from '../../context'
import { LANDD_CATEGORIES } from '../../constants'
import { useMediaQuery, useTheme } from '../../hooks'
import { deleteIcon, doneIcon } from '../../icons'
import { editIcon } from '../../icons'
import { getDateFormatted } from '../../utils'
import Table from '../Table'
import DeleteText from '../DeleteText'

const LoanAndDebtsTable = () => {
    const { btnSecondary } = useTheme()
    const [editableRowId, setEditableRowId] = useState(null)
    const [deleteRowId, setDeleteRowId] = useState(null)
    const [showHiden, setShowHiden] = useState(false)
    const isPageWide = useMediaQuery('(min-width: 576px)')
    const { data, deleteRecord, updateRecord, toggleHide } = useLonasAndDebts()
    // Temporary currency is uniq per aplication
    // Meaning only sugar
    // For this module currency may be includet into db record
    const { currency } = useSettings()
    const toogleShowHiden = () => {
        setShowHiden(showHiden => !showHiden)
    }
    const columns = useMemo(
        () => [
            {
                key: 'CATEGORY',
                title: 'CATEGORIA',
                dataIndex: 'category',
                render: (_, record) =>
                    record.isVisible ? (
                        LANDD_CATEGORIES[record.category]
                    ) : (
                        <DeleteText text={LANDD_CATEGORIES[record.category]} />
                    ),
            },
            {
                key: 'VALUE',
                title: 'VALOARE',
                dataIndex: 'value',
                render: (text, record) =>
                    record.isVisible ? (
                        <div className='d-flex justify-content-end w-75'>
                            <span
                                className={
                                    record.category === 'Loans'
                                        ? 'text-success'
                                        : 'text-danger'
                                }
                            >
                                {text} {currency}
                            </span>
                        </div>
                    ) : (
                        <DeleteText text={`${text} ${currency}`} />
                    ),
            },
            {
                key: 'DESCRIPTION',
                title: 'DESCRIERE',
                dataIndex: 'description',
                render: (text, record) =>
                    record.isVisible ? (
                        <p>
                            <small>{text}</small>
                        </p>
                    ) : (
                        <DeleteText text={text} />
                    ),
            },
            {
                key: 'LIMIT_DATE',
                title: 'DATA LIMITĂ',
                dataIndex: 'date',
                render: (text, record) =>
                    record.isVisible ? (
                        getDateFormatted(new Date(text))
                    ) : (
                        <DeleteText text={getDateFormatted(new Date(text))} />
                    ),
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
                            className='btn btn-outline-secondary'
                            style={{ width: '35px' }}
                            onClick={() => toggleHide(record.id)}
                        >
                            <img src={doneIcon} alt='Hide' />
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
        [isPageWide, toggleHide, currency]
    )

    const dataSource = useMemo(() => {
        return data
            .filter(s => s.isVisible || showHiden)
            .map(record => {
                return {
                    key: `${record.id}`,
                    ...record,
                }
            })
            .sort((a, b) =>
                new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
            )
    }, [data, showHiden])

    const onSubmit = fields => {
        updateRecord(
            editableRowId,
            fields.category,
            parseFloat(fields.value),
            fields.date,
            fields.description
        )
        setEditableRowId(null)
    }
    const onReset = () => setEditableRowId(null)
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                editableRowId={editableRowId}
                onSubmit={onSubmit}
                onReset={onReset}
                Component={LoansAndDebtsForm.LoansAndDebtsForm}
                validationSchema={LoansAndDebtsForm.validationSchema}
                mapRowToInitialValues={({
                    category,
                    value,
                    date,
                    description,
                }) => ({
                    category,
                    value,
                    description,
                    date: new Date(date),
                })}
                confirmRowId={deleteRowId}
                onOk={deleteRecord}
                onCancel={() => setDeleteRowId(null)}
                confimrMessage='Doriţi să ştergeţi înregistrarea?'
            />
            {data.filter(s => !s.isVisible).length > 0 && (
                <div className='row'>
                    <button
                        type='button'
                        className={`btn ${btnSecondary}`}
                        onClick={toogleShowHiden}
                    >
                        {`${showHiden ? 'Ascunde' : 'Vizualizează '} finisate`}
                    </button>
                </div>
            )}
        </>
    )
}

export default LoanAndDebtsTable

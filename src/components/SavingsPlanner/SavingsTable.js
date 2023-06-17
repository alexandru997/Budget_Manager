import { useMemo, useState } from 'react'
import { useSavingsData } from '../../context'
import { useMediaQuery, useTheme } from '../../hooks'
import ProgressBar from '../ProgressBar'
import Table from '../Table'
import { editIcon, deleteIcon, doneIcon } from '../../icons'
import * as SavingsForm from './SavingsForm'
import DeleteText from '../DeleteText'

const SavingsTable = () => {
    const { btnSecondary } = useTheme()
    const [editableRowId, setEditableRowId] = useState(null)
    const [deleteRowId, setDeleteRowId] = useState(null)
    const [showHiden, setShowHiden] = useState(false)
    const isPageWide = useMediaQuery('(min-width: 576px)')
    const { data, updateSavings, deleteSavings, toggleHide } = useSavingsData()

    const toogleShowHiden = () => {
        setShowHiden(showHiden => !showHiden)
    }

    const columns = useMemo(
        () => [
            {
                key: 'SAVINGS',
                title: 'ECONOMII',
                dataIndex: 'name',
                render: (_, record) =>
                    record.isVisible ? (
                        record.name
                    ) : (
                        <DeleteText text={record.name} />
                    ),
            },
            {
                key: 'PROGRESS',
                title: 'PROGRES',
                dataIndex: 'initValue',
                render: (_, record) => (
                    <div className='row h-100'>
                        <div className='col'>
                            <ProgressBar
                                currentValue={record.initValue}
                                targetValue={record.targetValue}
                            />
                        </div>
                    </div>
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
        [isPageWide, toggleHide]
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
        updateSavings(
            editableRowId,
            fields.name,
            fields.initValue,
            fields.targetValue
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
                Component={SavingsForm.SavingsForm}
                validationSchema={SavingsForm.validationSchema}
                mapRowToInitialValues={({ name, initValue, targetValue }) => ({
                    name,
                    initValue,
                    targetValue,
                })}
                confirmRowId={deleteRowId}
                onOk={deleteSavings}
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

export default SavingsTable

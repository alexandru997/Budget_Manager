import { useMediaQuery, useTheme } from '../hooks'
import { noop } from '../utils'
import FormikWrapper from './FormComponents'
import ActionConfirm from './ActionConfirm'

const Table = ({
    columns = [],
    dataSource = [],
    editableRowId,
    onSubmit = noop,
    onReset = noop,
    Component,
    mapRowToInitialValues,
    validationSchema,
    confirmRowId,
    onOk,
    onCancel,
    confimrMessage,
    onOkText,
    onCancelText,
}) => {
    const isPageWide = useMediaQuery('(min-width: 576px)')
    const { tableColor } = useTheme()
    return (
        <div className='table-responsive'>
            <table
                className={
                    'table ' + tableColor + (!isPageWide ? ' table-sm' : '')
                }
                style={{ fontSize: !isPageWide && '.8rem' }}
            >
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.key}
                                scope='col'
                                className='text-center'
                            >
                                {column.title}
                            </th>
                        ))}
                        {columns.length === 0 && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map(data =>
                        confirmRowId &&
                        confirmRowId === data.id &&
                        onOk &&
                        onCancel ? (
                            <tr key={data.key}>
                                <td colSpan={`${columns.length}`}>
                                    <ActionConfirm
                                        onOk={() => onOk(confirmRowId)}
                                        onCancel={() => onCancel(confirmRowId)}
                                        message={confimrMessage}
                                        onOkText={onOkText}
                                        onCancelText={onCancelText}
                                    />
                                </td>
                            </tr>
                        ) : editableRowId &&
                          editableRowId === data.id &&
                          Component &&
                          mapRowToInitialValues &&
                          validationSchema ? (
                            <tr key={data.key}>
                                <td colSpan={`${columns.length}`}>
                                    <FormikWrapper
                                        validationSchema={validationSchema}
                                        Component={Component}
                                        initialValues={mapRowToInitialValues(
                                            data
                                        )}
                                        onSubmit={onSubmit}
                                        onReset={onReset}
                                        formType='UPDATE'
                                    />
                                </td>
                            </tr>
                        ) : (
                            <tr key={data.key} className='text-center'>
                                {columns
                                    .map(column => {
                                        const content = data[column.dataIndex]
                                            ? data[column.dataIndex]
                                            : ''
                                        if (!!column.render) {
                                            return (
                                                <td
                                                    key={`${column.key}-${data.key}`}
                                                >
                                                    {column.render(
                                                        content,
                                                        data
                                                    )}
                                                </td>
                                            )
                                        }
                                        return (
                                            <td
                                                key={`${column.key}-${data.key}`}
                                            >
                                                {content}
                                            </td>
                                        )
                                    })
                                    .filter(Boolean)}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            {columns.length === 0 || dataSource.length === 0 ? (
                <p className='text-muted d-flex justify-content-center'>
                    Încă nu sunt date
                </p>
            ) : null}
        </div>
    )
}

export default Table

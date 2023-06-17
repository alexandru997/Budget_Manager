import { useMemo, memo } from 'react'
import { useTransactionData } from '../context'
import { PipeChartComponent } from './Charts'
import { Title } from './Heading'

const TransactionPipeChart = ({ calcFunct, title = null, getColorFunc }) => {
    const { data } = useTransactionData()
    const dataSource = useMemo(() => calcFunct(data), [data, calcFunct])
    return (
        <>
            {title && <Title text={title} />}
            <PipeChartComponent data={dataSource} getColorFunc={getColorFunc} />
        </>
    )
}

export default memo(TransactionPipeChart)

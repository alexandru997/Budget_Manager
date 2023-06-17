import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { getRandomColor, isMobileDevice } from '../../utils'

const PipeChartComponent = ({ data, getColorFunc = getRandomColor }) => {
    const renderCustomizedLabel = useMemo(
        () => ({ percent }) => {
            return `${(percent * 100).toFixed(0)}%`
        },
        []
    )
    return data.length > 0 ? (
        <div style={{ height: '300px' }}>
            <ResponsiveContainer width='100%'>
                <PieChart>
                    <Pie
                        data={data}
                        label={renderCustomizedLabel}
                        outerRadius={isMobileDevice() ? '60%' : '70%'}
                        fill='#8884d8'
                        dataKey='value'
                    >
                        {data.map((_, index, arr) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getColorFunc(index, arr.length)}
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    ) : (
        <p className='text-muted d-flex justify-content-center'>
            Încă nu sunt date
        </p>
    )
}

export default PipeChartComponent

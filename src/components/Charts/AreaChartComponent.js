import { useSettings } from '../../context'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

const AreaChartComponent = ({ data, keysAndColors }) => {
    const { currency } = useSettings()
    return data.length > 0 ? (
        <div style={{ height: '300px' }}>
            <ResponsiveContainer width='100%'>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        {keysAndColors.map(line => (
                            <linearGradient
                                key={line.dataKey}
                                id={'color' + line.dataKey}
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor={line.color}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset='95%'
                                    stopColor={line.color}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip formatter={label => `${label} ${currency}`} />
                    {keysAndColors.map(line => (
                        <Area
                            key={line.dataKey}
                            type='monotone'
                            dataKey={line.dataKey}
                            stroke={line.color}
                            fillOpacity={1}
                            fill={`url(#color${line.dataKey})`}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    ) : (
        <p className='text-muted d-flex justify-content-center'>
            Încă nu sunt date
        </p>
    )
}

export default AreaChartComponent

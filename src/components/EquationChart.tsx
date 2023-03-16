import React , {useState} from 'react'
import { Group,Card } from '@mantine/core'
import { evaluate } from 'mathjs';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from 'recharts'


interface chartData{
    dataX:Array<{x:number}>,
    Equation:string,
    RegX:string
}

interface XY{
    x:number,
    y:number
}

interface ArrayXY{
    data:XY[]
}

function EquationChart({dataX,Equation,RegX}:chartData) {
    const [dataPoint,setDataPoint] = useState<ArrayXY[]>()
    let objectXY:XY = {} as XY;
    let dataCal = [];

    const CalculateXY = ()=>{
        let y = dataX.map((e)=>evaluate(Equation,{[RegX]:e.x}))
    }
    const data = [
        {
          x: -50,
          y: -50,
        },
        {
          x: 0,
          y: 0,
        },
        {
          x: 50,
          y: 50,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 150,
          y: 150,
        },
        {
          x: 200,
          y: 200,
        },
        {
          x: 250,
          y: 250,
        },
        {
          x: 350,
          y: 350,
        },
        {
          x: 400,
          y: 400,
        },
        {
          x: 450,
          y: 450,
        },
        {
          x: 500,
          y: 500,
        },
      ];
      const minX = Math.min(...data.map((d)=>d.x))
      const minY = Math.min(...data.map((d)=>d.y))
  return (
    
    
    <Group position='center'>
      <Card shadow="md" p="sm" radius="md" withBorder>
        <div>
        
        <LineChart
          width={1000}
          height={500}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
            <Tooltip/>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
                dataKey="y"
                domain={['auto', 'auto']}
                type="number"
                interval={0}
                label={{
                    value: `Y`,
                    style: { textAnchor: 'middle' },
                    position: 'left',
                    offset: 0,
                }}
                allowDataOverflow={true}
                strokeWidth={minX < 0 ? 0 : 1}
            />

            <XAxis
                dataKey="x"
                domain={['auto', 'auto']}
                interval={0}
                type="number"
                label={{
                    key: 'xAxisLabel',
                    value: 'X',
                    position: 'bottom',
                }}
                allowDataOverflow={true}
                strokeWidth={minY < 0 ? 0 : 1}
            />

            {minY < 0 && (
                <ReferenceLine
                y={0}
                stroke="gray"
                strokeWidth={1.5}
                strokeOpacity={0.65}
                />
            )}
            {minX < 0 && (
                <ReferenceLine
                x={0}
                stroke="gray"
                strokeWidth={1.5}
                strokeOpacity={0.65}
                />
            )}

            <Line
                onClick={CalculateXY}
                strokeWidth={2}
                data={data}
                type="monotone"
                dataKey="y"
                stroke="black"
                tooltipType="none"
            />
        </LineChart>
      
        </div>
      </Card>
    </Group>
  )
}

export default EquationChart
import React , {useState,useEffect} from 'react'
import { Expression, GraphingCalculator } from "desmos-react";
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
    // const [dataPoint,setDataPoint] = useState<XY[]>()
    // let minX = 0
    // let minY = 0
    // let dataCal:XY[] = [];

    // const CalculateXY = ()=>{
    //   let y = dataX.map((e)=>evaluate(Equation,{[RegX]:e.x}))
    //   console.log(y);
      
    //   dataCal = dataX.map((e,index)=>{
    //     return{
    //       x:e.x,
    //       y:y[index]
    //     }
    //   })
    //   minX = Math.min(...dataCal.map((d)=>d.x))
    //   minY = Math.min(...dataCal.map((d)=>d.y))
    //   console.log(dataCal);
    //   setDataPoint(dataCal)
    // }
    
    // useEffect(()=>{
    //   CalculateXY()
    // },[])
      
  return (
    <>
      <Group position='center'>
        <Card shadow="md" p="sm" radius="md" withBorder>
          <div>
          <GraphingCalculator attributes={{ className: "calculator" }} projectorMode settingsMenu={false} >
            <Expression id="fn" latex="x^2" />
          </GraphingCalculator>
            {/* <LineChart
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

                {minY && minY < 0 && (
                    <ReferenceLine
                    y={0}
                    stroke="gray"
                    strokeWidth={1.5}
                    strokeOpacity={0.65}
                    />
                )}
                {minX && minX < 0 && (
                    <ReferenceLine
                    x={0}
                    stroke="gray"
                    strokeWidth={1.5}
                    strokeOpacity={0.65}
                    />
                )}

               <Line
                    strokeWidth={2}
                    data={dataPoint}
                    type="monotone"
                    dataKey="y"
                    stroke="black"
                    tooltipType="none"
                />
            </LineChart> */}
          </div>
        </Card>
      </Group>
    </>
  )
}

export default EquationChart
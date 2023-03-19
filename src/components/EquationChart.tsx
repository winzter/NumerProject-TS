import React , {useEffect, useState} from 'react'
import { Group,Card } from '@mantine/core'
import { evaluate } from 'mathjs';
import {
    Line,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    ReferenceDot,
    Tooltip,
    ReferenceLine,
    Legend,
    ComposedChart,
    ScatterChart
} from 'recharts'


interface chartData{
    Equation:string,
    RegX:string,
    Ans:number
}

interface XY{
    x:number,
    y:number
}


function EquationChart({Equation,RegX,Ans}:chartData) {

    const [dataPoint,setDataPoint] = useState<XY[]>([{x:0,y:0}])
    const [minX,setMinX] = useState(0);
    const [minY,setMinY] = useState(0);
    const [Answer,setAnswer] = useState<XY[]>([])
    let dataCal:XY[] = [];
    Ans = Number(Ans.toFixed(6))
    
    const CalculateXY = ()=>{
        let dataX = Array.from({length:20},(_,i)=>(i+1)*(-1));
        dataX.sort((a,b)=>b-a).reverse()
        
        let dataX2 = Array.from({length:21},(_,i)=>i)
        dataX2.sort((a,b)=>a-b) 
        let allDataX = [...dataX,...dataX2]
        
        let dataY = allDataX.map((e)=>evaluate(Equation,{[RegX]:e}))
        dataCal = dataY.map((element,index)=>{
          return{
            x:allDataX[index],
            y:Number(element.toFixed())
          }
        })
        setMinX(Math.min(...dataCal.map((d)=>d.x)))
        setMinY(Math.min(...dataCal.map((d)=>d.y)))
        setDataPoint(dataCal)

        const AnsData = [Ans*-1,Ans]
        let RefDot = AnsData.map((e)=>evaluate(Equation,{[RegX]:e}))
        
         setAnswer(RefDot.map((e,index)=>{
          return{
            x:AnsData[index],
            y:e.toFixed()
          }
        }).filter((e)=>e.y == 0))
        console.log(Equation);
      }


    useEffect(()=>{
      CalculateXY()
    },[])


  return (
    <Group position='center' mt="md">
      <Card shadow="md" p="sm" radius="md" withBorder>
        <div>
          <ScatterChart
            width={1000}
            height={500}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              dataKey="x"
              name='X'
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

            <YAxis 
              dataKey="y"
              domain={['auto', 'auto']}
              type="number"
              name='Y'
              interval={0}
              label={{
                  value: `Y`,
                  style: { textAnchor: 'middle' },
                  position: 'left',
                  offset: 10,
              }}
              allowDataOverflow={true}
              strokeWidth={minX < 0 ? 0 : 1}
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
            
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter  data={dataPoint} fill="black" line name='Equation'/>
            <Scatter  data={Answer} fill="red"/>
          </ScatterChart>
          {/* <LineChart
            data={dataCal}
            width={1000}
            height={500}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
                dataKey="y"
                domain={['auto', 'auto']}
                type="number"
                name='Y'
                interval={0}
                label={{
                    value: `Y`,
                    style: { textAnchor: 'middle' },
                    position: 'left',
                    offset: 10,
                }}
                allowDataOverflow={true}
                strokeWidth={minX < 0 ? 0 : 1}
              />
            <XAxis
                dataKey="x"
                name='X'
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
            <Tooltip/>
             <Line
                strokeWidth={0}
                data={dataPoint}
                type="monotone"
                dataKey="x"
                dot={false}
                stroke="black"
                name='X'
            />
            <Line
                strokeWidth={2}
                data={dataPoint}
                type="monotone"
                dataKey="y"
                stroke="black"
                name='Y'
            />
          </LineChart> */}
        </div>
      </Card>
    </Group>
  )
}

export default EquationChart
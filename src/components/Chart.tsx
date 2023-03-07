import React from 'react'
import { Group,Card } from '@mantine/core';
import { LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend } from 'recharts';

interface Data {
  iteration: number;
  Xl?: number;
  Xm: number;
  Xr?: number;
  Err: number;
  ErrNotDecimal?: number;
}

interface Props {
  data:Data[]
}
function Chart({data}:Props) {
    console.log(data);
  return (
    <Group position='center'>
      <Card shadow="md" p="sm" radius="md" withBorder>
        <div>
          <LineChart
            width={500}
            height={390}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration"/>
            <YAxis scale="log" domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" strokeWidth={2} dataKey="Err" stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            <Line type="monotone" strokeWidth={2} dataKey="Xm" stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
          </LineChart>
        </div>
      </Card>
    </Group>
  )
}

export default Chart
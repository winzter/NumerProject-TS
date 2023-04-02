import React from 'react'
import { Grid , NumberInput } from '@mantine/core'

interface Dimension{
    Dimension:number,
    Matrix:number[][],
    setValueOfMatrix(value:number|undefined,i:number,j:number): void
}

function CreateMatrix({Dimension , setValueOfMatrix ,Matrix}:Dimension) {
    let ansColumn = Dimension+1
    const input:React.ReactNode[] = []

        for(let i=0;i<Dimension;i++){
            for(let j=0;j<Dimension;j++){
                input.push(
                    <Grid.Col key={`${i}-${j}`} span={(ansColumn*2)/ansColumn}>
                        <NumberInput 
                            value={Matrix[i][j]}
                            label={`X${i}${j}`}  
                            onChange={(value:number)=>setValueOfMatrix(value,i,j)} 
                            required 
                            hideControls
                        />
                    </Grid.Col>)
            }
            input.push(
                <Grid.Col key={i} span={(ansColumn*2)/ansColumn}>
                    <NumberInput label={"Y"} value={0} required hideControls/>
                </Grid.Col>)
        }

    return(
        <Grid columns={ansColumn*2}>
            {input}
        </Grid>
    )
}

export default CreateMatrix
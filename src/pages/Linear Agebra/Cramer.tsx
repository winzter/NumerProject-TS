import { NumberInput , Group , Button, Grid , Container , NativeSelect} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react';
import React , { useState } from 'react'
import Header from '../../components/Header'

function Cramer() {
    const [NumberMatrix,setNumberMatrix] = useState('2')
    const [Matrix,setMatrix] = useState<number[][]>(
        Array(Number(NumberMatrix))
        .fill(0)
        .map(() => Array(Number(NumberMatrix)).fill(0))
    )
    const [ValueMatrix,setValueMatrix] = useState<[]>([])
   

    const createMatrix = (e:string) =>{
        let Dimension = Number(e)
        let ansColumn = Dimension+1
        const input = []
        
        for(let i=0;i<Dimension;i++){
            for(let j=0;j<Dimension;j++){
                input.push(
                    <Grid.Col key={`${i}-${j}`} span={(ansColumn*2)/ansColumn}>
                        <NumberInput label={"x"} value={0} onChange={(event)=>setValueOfMatrix(event,i,j)} required hideControls/>
                    </Grid.Col>)
            }
            input.push(
                <Grid.Col key={i} span={(ansColumn*2)/ansColumn}>
                    <NumberInput label={"y"} value={0} required hideControls/>
                </Grid.Col>)
        }
        
        return(
            <Grid columns={ansColumn*2}>
                {input}
            </Grid>
        )
    }
    
    const setValueOfMatrix = (value:number|undefined,i:number,j:number)=>{
        if(value !== undefined){
            const matrix:any = [...Matrix]
            matrix[i][j] = value
            console.log(matrix);
            //setMatrix(matrix)
        }
       
    }

    const CalCramer = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(e.currentTarget);
    }

  return (
    <>
        <Header text="Cramer"/>
         <Container size={550} px="md">
            <form onSubmit={CalCramer}>
                <NativeSelect
                    mb={20}
                    data={['2','3','4','5','6','7','8']}
                    rightSection={<IconChevronDown size="1rem" />}
                    rightSectionWidth={40}
                    label="Dimension Of Matrix 2-8"
                    onChange={(event) => {setMatrix(Array(Number(event.currentTarget.value))
                        .fill(0)
                        .map(() => Array(Number(event.currentTarget.value)).fill(0)))
                        setNumberMatrix(event.currentTarget.value)
                        }
                    }
                />
                {createMatrix(NumberMatrix)}
                <Group position='center' mb="md">
                    <Button 
                        mt="md" 
                        size='sm' 
                        type='submit' 
                        variant="gradient" 
                        gradient={{ from: 'pink', to: 'orange', deg:60 }}>
                            Calculate
                    </Button>
                </Group>
            </form>
        </Container>
    </>
  )
}

export default Cramer
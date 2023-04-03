import React , { useState } from 'react'
import { Group , Button , Container , NativeSelect} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react';
import { det } from 'mathjs'
import CreateMatrix from '../../components/CreateMatrix';
import Header from '../../components/Header'

function Cramer() {
    const [NumberMatrix,setNumberMatrix] = useState<number>(2)
    const [Matrix,setMatrix] = useState<number[][]>(
        Array(Number(NumberMatrix))
        .fill(0)
        .map(() => Array(Number(NumberMatrix)).fill(0))
    )
    const [ValueMatrix,setValueMatrix] = useState<number[]>(
        Array(Number(NumberMatrix)).fill(0)
    )
    const [Answer,setAnswer] = useState<number[]>([])

    const setValueOfMatrix = (value:number,i:number,j:number)=>{
        if(value !== undefined){
            const matrix:number[][] = [...Matrix]
            matrix[i][j] = value
            console.log(matrix);
            setMatrix(matrix)          
        }
        //console.log(Matrix);
    }
    
    const setAnsOfMatrix = (ans:number,i:number)=>{
        if(ans !== undefined){
            const matrix:number[] = [...ValueMatrix]
            matrix[i] = ans
            // console.log(matrix);
            setValueMatrix(matrix)
        }
    }

    const CalCramer = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(Matrix);
        console.log(ValueMatrix);
        
        let k=0 , mC:number[][],x:number[] = Array(NumberMatrix).fill(0),mB:number[] = [...ValueMatrix],mA:number[][] = [...Matrix]
        for(let j=0;j<NumberMatrix;j++){
            mC = mA.map(row => [...row])
            for(let i=0;i<NumberMatrix;i++){
                mC[i][k] = mB[i];
            }
            x[k] = det(mC)/det(mA);
            console.log(`X${k+1} = ${x[k]}`);
            k++;
        }
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
                    onChange={(event) => {
                        setMatrix(
                            Array(Number(event.currentTarget.value))
                            .fill(0)
                            .map(() => 
                                Array(Number(event.currentTarget.value)).fill(0)
                            )
                        )
                        setValueMatrix(Array(Number(event.currentTarget.value)).fill(0))
                        setNumberMatrix(Number(event.currentTarget.value))
                        }
                    }
                />
                <CreateMatrix 
                    Dimension={NumberMatrix} 
                    setValueOfMatrix={setValueOfMatrix}
                    setAnsOfMatrix={setAnsOfMatrix}
                    MatrixData={Matrix}
                    AnsData={ValueMatrix}
                />
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
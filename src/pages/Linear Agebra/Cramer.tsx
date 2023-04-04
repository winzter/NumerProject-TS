import React , { JSXElementConstructor, useState } from 'react'
import { Group , Button , Container } from '@mantine/core'
import { det } from 'mathjs'
import InputMatrix from '../../components/InputMatrix';
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
    const [Answer,setAnswer] = useState<number[]>(
        Array(NumberMatrix).fill(0)
    )
    

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

    const showAns = ()=>{
        let ans:React.ReactNode[] = []
        for(let i=0;i<NumberMatrix;i++){
            ans.push(
                <h2 key={i}>Y{i} = {Answer[i]}</h2>
            )
        }
        return(
            <div>
                <h1>asdasdasd</h1>
            </div>
        )
    }

    const setMatrixState = (value:number)=>{
        console.log(value);
        setMatrix(
            Array(value)
            .fill(0)
            .map(() => 
                Array(value).fill(0)
            )
        )
        setValueMatrix(Array(value).fill(0))
        setNumberMatrix(value)
    }

    const CalCramer = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(Matrix);
        console.log(ValueMatrix);
        
        let k=0 , 
        mC:number[][],
        ans:number[]=[],
        x:number[] = Array(NumberMatrix).fill(0),
        mB:number[] = [...ValueMatrix],
        mA:number[][] = [...Matrix],
        DetA:number = det(mA)
        if(DetA === 0){
            console.log("Can't divide by zero!");
        }
        else{
            for(let j=0;j<NumberMatrix;j++){
                mC = mA.map(row => [...row])
                for(let i=0;i<NumberMatrix;i++){
                    mC[i][k] = mB[i];
                }
                x[k] = det(mC)/DetA;
                ans.push(x[k])
                console.log(`Y${k} = ${x[k]}`);
                k++;
            }
            console.log(ans);
            setAnswer(ans)
        } 
    }
    

  return (
    <>
        <Header text="Cramer"/>
        {/* <Group position="center">
        <Grid justify='center'>
            <Grid.Col span="content">*/}
                {/* <Card withBorder radius='md' p='xs' shadow='md'>  */}
                    <Container size={550} px="md">
                        <form onSubmit={CalCramer}>
                            <InputMatrix
                                setMarixState={setMatrixState}
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
                    {/* {showAns} */}
                 {/* </Card> */}
            {/*</Grid.Col>
        </Grid>
        </Group> */}
    </>
  )
}

export default Cramer
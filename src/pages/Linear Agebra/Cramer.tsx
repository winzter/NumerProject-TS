import { NumberInput , Group , Button, Grid , Card , Container , Flex} from '@mantine/core'
import React , { Fragment, useState } from 'react'
import Header from '../../components/Header'

function Cramer() {
    const [NumberMatrix,setNumberMatrix] = useState(0)

    const createMatrix = (e:number) =>{
        let count = 1;
        const input = []
        const ansInput = []
        if(e>6 || e === 1){
            e=0
        }
        else{
            for(let i=0;i<e;i++){
                for(let j=0;j<e;j++){
                    input.push(
                        <Grid.Col  key={count} span={12/e}>
                            <NumberInput label={count} value={0} required/>
                        </Grid.Col>)
                    count++;
                }
            }
        }
        return(
            <Grid columns={12%e === 0?12:5}>
                {input}
            </Grid>
        )
    }

    const CalCramer = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(e);
    }

    const setNumMatrix = (e:number)=>{
        setNumberMatrix(e)
    }
  return (
    <>
        <Header text="Cramer"/>
         <Container size="xs" px="md">
            <form onSubmit={CalCramer}>
                <NumberInput
                    width={100}
                    mb={20}
                    label="Dimension Of Matrix"
                    onChange={setNumMatrix}
                    required
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
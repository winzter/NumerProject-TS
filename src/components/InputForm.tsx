import React from 'react'
import {
  Group,
  Button,
  NumberInput,
  TextInput,
  Card,
} from '@mantine/core';

interface InputData{
    labelFX?:string,
    labelGX?:string,
    labelXL?:string,
    labelXR?:string,
    labelError?:string,
}

interface InputField {
    starter:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    form?:InputData,
    valEquationFx?:string,
    valEquationGx?:string,
    valError?:number,
    valX:number,
    setXL?:(event:number)=>void,
    setXR?:(event:number)=>void,
    setERROR?:(event:number)=>void,
    calculateRoot:(e:React.FormEvent<HTMLFormElement>)=>void,
    setEquationFx:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    setEquationGx?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
}

function InputForm(props:InputField) {
  return (
    <Card shadow="md" p="xl" radius="md" withBorder>
        <form onSubmit={props.calculateRoot}>
            {props.form && 
                <div>
                    <TextInput
                        label={props.form.labelFX}
                        onChange={props.setEquationFx}
                        value={props.valEquationFx}
                        required
                    />
                    {props.form.labelGX && <TextInput
                        label={props.form.labelGX}
                        onChange={props.setEquationGx}
                        value={props.valEquationGx}
                        required
                    />}
                    <NumberInput
                        label={props.form.labelXL}
                        onChange={props.setXL}
                        precision={2}
                        required
                    />
                    {props.form.labelXR && <NumberInput
                        label={props.form.labelXR}
                        onChange={props.setXR}
                        precision={2}
                        required
                    />}
                    <NumberInput
                        label="Error"
                        onChange={props.setERROR}
                        value={props.valError}
                        precision={6}
                        step={0.000001}
                        min={0}
                        required
                    />
                    <Group position='center' mb="xs">
                        <Button 
                            mt="md" 
                            size='sm' 
                            type='submit' 
                            variant="gradient" 
                            gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                                Calculate
                        </Button>
                    </Group>
                </div>
            }
            <h2>Answer = {props.valX.toPrecision(7)}</h2>
        </form>
    </Card>
   
  )
}

export default InputForm
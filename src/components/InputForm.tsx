import React , {useEffect,useState} from 'react'
import axios from 'axios';
import {
  Group,
  Button,
  NumberInput,
  TextInput,
  Card,
  Select
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
    valXl?:number,
    valXr?:number
    valEquationFx?:string,
    valEquationGx?:string,
    valError?:number,
    valX:number,
    setXL?:(event:number)=>void,
    setExampleData:(data:any[])=>void,
    setXR?:(event:number)=>void,
    setERROR?:(event:number)=>void,
    calculateRoot:(e:React.FormEvent<HTMLFormElement>)=>void,
    setEquationFx:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    setEquationGx?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
}

function InputForm(props:InputField) {
    const [apiData,setApiData] = useState<{value:string,label:string}[]>([])

    if(props.valEquationGx){
        let select = document.querySelector(".Select")
        if(select){
            select.setAttribute("disabled", "")
        }
        
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/rootofequation").then((res)=>{
            console.log(res.data);
            setApiData(res.data)
      })
    },[])

  return (
    <>
        <Card shadow="md" p="xl" radius="md" withBorder>
            <form onSubmit={props.calculateRoot}>
                {props.form && 
                    <div>
                        <TextInput
                            label={props.form.labelFX}
                            onChange={(e)=>{
                                props.setEquationFx(e)
                                const item = { value: e.currentTarget.value, label: e.currentTarget.value ,xl:"0",xr:"0",group:"History"};
                                setApiData((current) => [...current, item]);
                                return item;
                            }}
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
                            value={props.valXl}
                            required
                        />
                        {props.form.labelXR && <NumberInput
                            label={props.form.labelXR}
                            onChange={props.setXR}
                            precision={2}
                            value={props.valXr}
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
        {apiData.length > 0 && <Select
            className='Select'
            label="Example Of Equations"
            data={apiData}
            placeholder="Pick one that you like"
            clearable
            searchable
            creatable
            getCreateLabel={(query) => `${query}`}
            onCreate={(query) => {
                const item = { value: query, label: query ,group:"History"};
                setApiData((current) => [...current, item]);
                return item;
            }}
            dropdownPosition="bottom"
            maxDropdownHeight={5000}
            shadow='md'
            onChange={(e)=>{
                let data:any[] = []
                console.log(e);
                                
                apiData.map((x:any)=>{
                    if(x.value === e){
                        data.push(x)
                    }
                    return data
                                    
                })
                console.log(data);
                props.setExampleData(data)
                                
            }}
        />}
   </>
  )
}

export default InputForm
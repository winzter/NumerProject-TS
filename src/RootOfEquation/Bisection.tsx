import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import InputForm from '../components/InputForm';
import TableOutput from '../components/TableOutput';
import Header from '../components/Header';
import ReactChart from '../components/ReactChart';
import Chart from '../components/Chart';
import {
  Group,
  Grid,
} from '@mantine/core';

interface BisectionObject {
    iteration: number;
    Xl: number;
    Xm: number;
    Xr: number;
    Err: number;
    ErrNotDecimal: number;
  }
interface LabelBisecFalse{
    Xl: string;
    Xm: string;
    Xr: string;
    Err: string;
}

interface LabelForm {
    labelFX:string,
    labelXL:string,
    labelXR:string
}



function Bisection() {

    const [newData, setNewData] = useState<BisectionObject[]>([]);
    const [UserInput , setUserInput] = useState({
      Equation:"(x^4)-13",
      X:0,
      XL:0,
      XR:0,
      Error:0.000001,
      starter:"x"
    })
    // const [Equ, setEqu] = useState<any[]>([]);
    const [Status, setStatus] = useState<boolean>(false);
    // const [id, setId] = useState<string>('#t');

    const data: BisectionObject[] = [];
    
    const labelForm: LabelForm = {
      labelFX:`Input f(${UserInput.starter})`,
      labelXL:`Input ${UserInput.starter.toUpperCase()}L`,
      labelXR:`Input ${UserInput.starter.toUpperCase()}R`
    }
    const label: LabelBisecFalse = {
        Xl:`${UserInput.starter.toUpperCase()}L`,
        Xm:`${UserInput.starter.toUpperCase()}M`,
        Xr:`${UserInput.starter.toUpperCase()}R`,
        Err:`Error`
    }
    
    
    const error = (xold: number, xnew: number): number => Math.abs((xnew - xold) / xnew) * 100;

    const Calbisection = (xl: number, xr: number,Scope:string): void => {
        let xm, fXm, fXr, ea=100;
        let iter = 0;
        const MAX = 50;
        let obj: BisectionObject = {} as BisectionObject;
        
        do {
          xm = (xl + xr) / 2.0;
          fXr = evaluate(UserInput.Equation, { [Scope]: xr });
          fXm = evaluate(UserInput.Equation, { [Scope]: xm });
          iter++;
    
          if (fXm * fXr > 0) {
            ea = error(xr, xm);
            obj = {
              iteration: iter,
              Xl: xl,
              Xm: xm,
              Xr: xr,
              Err: ea,
              ErrNotDecimal: Math.round(ea),
            };
            data.push(obj);
            xr = xm;
          } else if (fXm * fXr < 0) {
            ea = error(xl, xm);
            obj = {
              iteration: iter,
              Xl: xl,
              Xm: xm,
              Xr: xr,
              Err: ea,
              ErrNotDecimal: Math.round(ea),
            };
            data.push(obj);
            xl = xm;
          }
        } while (ea > UserInput.Error && iter < MAX);
    
        setUserInput({
          ...UserInput,
          X:xm
        })
    };

    const Regex = ((Eq:String)=>{
        let test:RegExp = /[a-zA-Z]/i;
        let Alphabet:RegExpMatchArray | null= Eq.match(test)
        if(Alphabet){
          return Alphabet[0];
        }
    })
    
    const calculateRoot = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        // let fx: {fn: string}[] = [{fn:`${Equation ? Equation : 0}`}];
        const xlnum: number = UserInput.XL;
        const xrnum: number = UserInput.XR;
        const Scope:any = Regex(UserInput.Equation);
        Calbisection(xlnum, xrnum,Scope);
        setNewData(data)
        setStatus(true);
        // setEqu(fx);
        // setHtml(print(Scope));
        setUserInput((prevState)=>{
          return{
            ...prevState,
            starter:Scope
          }
        })
        // setId("#test");
    }

    const SetEquation = (event:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(event.target.value);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          Equation:event.target.value
        }
      })
    }

    const SetXL = (event:number)=>{
      console.log(event);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          XL:event
        }
      })
    }

    const SetXR = (event:number)=>{
      console.log(event);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          XR:event
        }
      })
    }

    const SetERROR = (event:number)=>{
      setUserInput((prevState)=>{
        return{
          ...prevState,
          Error:event
        }
      })
    }

    const SetStarter = (event:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(event.target.value);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          starter:event.target.value
        }
      })
    }

  return (
    <>
      <Header text="Bisection Method"/>
      <Group position="center">
        <Grid justify='center'>
          <Grid.Col span="content">
            <InputForm 
              starter={SetStarter}
              calculateRoot={calculateRoot} 
              setEquationFx={SetEquation} 
              valEquationFx={UserInput.Equation}
              valX={UserInput.X}
              valError={UserInput.Error}
              form={labelForm}
              setXL={SetXL}
              setXR={SetXR}
              setERROR={SetERROR}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <Chart data={newData}/>
          </Grid.Col>
        </Grid>
        </Group>
        <ReactChart/>
      {Status && <TableOutput 
        data={newData} 
        label={label}
      />}
    </>
  )
}

export default Bisection
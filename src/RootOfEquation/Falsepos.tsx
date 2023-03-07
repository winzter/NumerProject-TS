import React , { useState }from 'react';
import InputForm from '../components/InputForm';
import TableOutput from '../components/TableOutput';
import { evaluate } from 'mathjs'
import Header from '../components/Header';
import Chart from '../components/Chart';
import {
  Group,
  Grid,
} from '@mantine/core';

interface FalsePostionObject {
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

function Falsepos() {

    const data:FalsePostionObject[] =[];
    const [UserInput,setUserInput] = useState({
      Equation:"(x^4)-13",
      X:0,
      XL:0,
      XR:0,
      Error:0.000001,
      starter:"x"
    })
    const [newData,setNewData] = useState<FalsePostionObject[]>([]);
    // const [Equ,setEqu] = useState<any[]>([]);
    const [Status,setStatus] = useState<boolean>(false);
   

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
    
      const error =(xold:number, xnew:number)=> Math.abs((xnew-xold)/xnew)*100;
    
      const Calfalsepos = (xl:number, xr:number,Scope:string) => {
            setStatus(true)
            var fXnew,fXr,ea=100,xnew:number,xold=0,fXl;
            var iter = 0;
            var MAX = 50;
            var obj: FalsePostionObject = {} as FalsePostionObject;
            do
            {
              fXl = evaluate(UserInput.Equation,{[Scope]:xl})
              fXr = evaluate(UserInput.Equation, {[Scope]:xr})
              xnew = (xl*fXr - xr*fXl)/(fXr-fXl);
              fXnew = evaluate(UserInput.Equation, {[Scope]:xnew})
              iter++;
              if (fXnew*fXr > 0)
              {
                  ea = error(xold, xnew);
                  obj = {
                      iteration:iter,
                      Xl:xl,
                      Xm:xnew,
                      Xr:xr,
                      Err:ea,
                      ErrNotDecimal:Math.round(ea)
                  }
                  data.push(obj)
                  xr = xnew;
              }
              else if (fXnew*fXr < 0)
              {
                  ea = error(xold, xnew);
                  obj = {
                      iteration:iter,
                      Xl:xl,
                      Xm:xnew,
                      Xr:xr,
                      Err:ea,
                      ErrNotDecimal:Math.round(ea)
                  }
                  data.push(obj)
                  xl = xnew;
              }
              xold = xnew;
            }while(ea>UserInput.Error && iter<MAX)
            setUserInput((prevState)=>{
              return{
                ...prevState,
                X:xnew
              }
            })
      }
    
     
        const Regex = ((Eq:String)=>{
            let test:RegExp = /[a-zA-Z]/i;
            let Alphabet:RegExpMatchArray | null= Eq.match(test)
            if(Alphabet){
            return Alphabet[0];
            }
        })

        const calculateRoot = (e:React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            const xlnum:number = UserInput.XL
            const xrnum:number = UserInput.XR
            // let fx = [{fn:`${Equation?Equation:0}`}]
            const Scope:any= Regex(UserInput.Equation);
            Calfalsepos(xlnum,xrnum,Scope);
            setUserInput((prevState)=>{
              return{
                ...prevState,
                starter:Scope
              }
            })
            setNewData(data);
            // setEqu(fx);
            setStatus(true)   
            // setHtml(print(Scope));
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
            console.log(event);
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
            <Header text="False Position Method"/>
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
            
            {Status && <TableOutput
                data={newData} 
                label={label}
            />}
        </>
    )
}

export default Falsepos
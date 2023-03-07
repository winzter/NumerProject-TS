import React , { useState } from 'react'
import InputForm from '../components/InputForm';
import { evaluate , derivative } from 'mathjs'
import Header from '../components/Header';
import TableOutput from '../components/TableOutput';
import Chart from '../components/Chart';
import { Grid, Group } from '@mantine/core';

interface NewtonObject{
    iteration:number,
    Xm:number,
    Err:number,
    ErrNotDecimal:number
}

interface LabelForm {
    labelFX:string,
    labelXL:string,
}

interface LabelFormNewton{
    Xm:string,
    Err:string
}

function Newton() {
    const data:NewtonObject[] = []
    const [UserInput,setUserInput] = useState({
        X:0,
        Equation:"(x^2)-7",
        Error:0.000001,
        starter:"x"
    })
    const [newData,setNewData] = useState<NewtonObject[]>([]);
    // const [Equ,setEqu] = useState([]);
    const [Status,setStatus] = useState(false);
    const [Ans,setAns] = useState<number>(0);

    const labelForm: LabelForm = {
        labelFX:`Input f(${UserInput.starter})`,
        labelXL:`Input ${UserInput.starter.toUpperCase()}`   
    }

    const label: LabelFormNewton = {
        Xm:`${UserInput.starter.toUpperCase()}`,
        Err:`Error`
    }
    // const [id,setId] = useState("#t")


    const error = (xold:number,xnew:number)=>{
        return Math.abs((xnew-xold)/xnew)*100
    }

    const calNewton = (x:number,Scope:string)=>{
        let fx,fxp,xnew=0,ea;
        let iter=0;
        const MAX = 50;

        do{
            fx = evaluate(UserInput.Equation,{[Scope]:x});
            fxp = derivative(UserInput.Equation,`${[Scope]}`).evaluate({[Scope]:x});
            console.log(fxp);
            xnew = x - (fx/fxp);
            ea = error(x,xnew);
            x = xnew;
            iter++;
            data.push({
                iteration:iter,
                Xm:xnew,
                Err:ea,
                ErrNotDecimal:Math.round(ea)
            })
            console.log("Iter : "+iter," ","X : "+xnew+" Err : "+ea);
            setAns(xnew);
        }while(ea>UserInput.Error && iter<MAX)
    }

    const Regex = ((Eq:String)=>{
        let test:RegExp = /[a-zA-Z]/i;
        let Alphabet:RegExpMatchArray | null= Eq.match(test)
        if(Alphabet){
        return Alphabet[0];
        }
    })

    const calculateRoot = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        const Scope:any = Regex(UserInput.Equation)
        calNewton(UserInput.X,Scope);
        // setShowTable(print(Scope));
        setUserInput((prevState)=>{
            return{
                ...prevState,
                starter:Scope
            }
        })
        // setId("#test")
        // let fx = [{fn:`${Equation?Equation:0}`}]
        // setEqu(fx);
        setNewData(data)
        setStatus(true) 
        console.log(data);
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
  
      const SetX = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X:event
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
        <Header text="Newton Raphson Method"/>
        <Group position='center'>
            <Grid justify='center'>
                <Grid.Col span="content">
                    <InputForm
                        valEquationFx={UserInput.Equation}
                        valX={Ans}
                        valError={UserInput.Error}
                        form={labelForm}
                        starter={SetStarter}
                        setXL={SetX}
                        setEquationFx={SetEquation}
                        setERROR={SetERROR}
                        calculateRoot={calculateRoot}
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

export default Newton
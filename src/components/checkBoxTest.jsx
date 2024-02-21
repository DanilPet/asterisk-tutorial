import { useState } from "react"
import { useEffect } from "react"

export default function CheckBoxTest({... props}) {
    const [first, setFirst] = useState([false, false, false, false])

    useEffect(() => {
        let newFirst = [false]
        for (let i = 0; i <= props.v.length - 2; i++) {
            newFirst.push(false)
        }
        setFirst(newFirst)
    }, [])

    useEffect(() => {
        examination(first)
    }, [first])


    const test = {
        id: props.id,

        variables: props.v,

        trueVars: props.trueVars

    }
    function currentFunction(id) {
        let newAnswers = first.slice(0)     
        newAnswers[id] = !newAnswers[id]
        setFirst(newAnswers)
    }

    
    function examination(first) {
        let newVars = first.map((value, index) => {
            if (value === props.trueVars[index]) {
                return true
            } else {
                return false
            }
        })

        if (newVars.includes(false)) {
            props.exam(false)
        } else {

            props.exam(true)
        }
        
    }

    return (
        <>

            <div className="test">
                <h4>{props.title}</h4>
                {test.variables.map((variable, index) => {
                    return <div className='radio-check'>
                                <input className='my-check-radio' name={"myCheckBox" + test.id} id={test.id + "-" + index} type='checkBox' onChange={() => {currentFunction(index)}} checked={first[index]}></input>
                                <label className="my-check-label" htmlFor={test.id + "-" + index}>
                                    {variable}
                                </label>                
                            </div>
                })} 
            </div>
        </>
    )

}
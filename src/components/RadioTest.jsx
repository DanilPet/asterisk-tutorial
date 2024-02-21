import { useState } from "react"
import { useEffect } from "react"

export default function RadioTest({... props}) {
    const [first, setFirst] = useState([])
    const [render, setRender] = useState(null)
    
    useEffect(() => {
        let newFirst = [true]
        for (let i = 0; i <= props.v.length - 2; i++) {
            newFirst.push(false)
        }
        
        setFirst(newFirst)
    }, [])

    useEffect(() => {
        setTimeout(() => {
        
            examination(0)
        
        }, 100)
    }, [])
   
    const test = {
        id: props.id,
        variables: props.v,
        trueVar: props.trueVar
    }
    function currentFunction(id) {
        let newAnswers = [false, false, false, false]        
        newAnswers[id] = true
        examination(id)
        setFirst(newAnswers)
    }

    
    function examination(id) {
        if (id === props.trueVar) {

            props.exam(true)
        } else {

            props.exam(false)
        }
        
    }

    return (
        <>

            <div className="test">
                <h4>{props.title}</h4>
                {test.variables.map((variable, index) => {
                    return <div className='radio-check'>
                                <input className='my-check-radio' name={"myCheckRadio" + test.id} id={test.id + "-" + index} type='radio' onChange={() => {currentFunction(index)}} checked={first[index]}></input>
                                <label className="my-check-label" htmlFor={test.id + "-" + index}>
                                    {variable}
                                </label>               
                            </div>
                })} 
            </div>
        </>
    )

}
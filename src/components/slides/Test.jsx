import { useState } from "react";
import { TestsA } from "../../data/testsA";
import Tests from "../Tests";
import { useEffect } from "react";


export default function Test({... props}) {
    const test = structuredClone(props.test) 
    const testId = test.id
    const [results, setResult] = useState([])
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        const newResults = localStorage.getItem('results') || JSON.stringify([]) 
        setResult(JSON.parse(newResults))
        setFinish(false)
    }, [props.rend])
    useEffect(() => {
        results.map((result) => {
            if (test.id === result.id) {
                setFinish(true)
                props.block(false)
            }
        })
    }, [results])

    return (
        <div className="slider">
            <div className="slider_test">
                <h3>{props.test.name}</h3>
                <Tests test = {test} rend = {props.rend} block = {props.block}/>
               
            </div>
            

            
        </div>
    )
    
}
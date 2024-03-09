import { useState } from "react";
import { TestsA } from "../../data/testsA";
import Tests from "../Tests";
import { useEffect } from "react";


export default function Test({... props}) {
    const test = structuredClone(props.test) 
    const testId = test.id
    const [results, setResult] = useState([])
    const [finish, setFinish] = useState(false)


    return (
        <div className="slider">
            <div className="slider_test">
                <h3>{props.test.name}</h3>
                <Tests encr = {props.encr} test = {test} rend = {props.rend} block = {props.block}/>
               
            </div>
            

            
        </div>
    )
    
}
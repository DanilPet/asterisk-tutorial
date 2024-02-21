import { useEffect, useState } from 'react'
import DragTest from './DragTest'
import RadioTest from './RadioTest'
import CheckBoxTest from './checkBoxTest'
import {Button} from 'react-bootstrap'
export default function Tests({... props}) {
    
    const tests = props.test.tests
    const testId = props.test.id
    const [exam, setExam] = useState([])
    const numberQ = tests.length
    const [numberA, setNumberA] = useState(0)
    const [isFinish, setIsFinish] = useState(false)
    const [right, setRight] = useState(null)
    const [results, setResult] = useState([])
    let result;
    if (numberA && numberQ) {
        let point = 5 / numberQ * numberA    
        if (point < 2.5) {
            result = 2
        } else if (point >= 2.5 && point < 3.5 ) {
            result = 3
        } else if (point >= 3.5 && point < 4.5) {
            result = 4
        } else if (point >= 4.5) {
            result = 5
        }
    } 

    useEffect(() => {
        localStorage.setItem('tests', JSON.stringify(props.test))

    }, [])

    useEffect(() => {
        if(isFinish === true) {
            props.block(false)    
            localStorage.removeItem("tests")
        }
    }, [isFinish])

    useEffect(() => {
        const newResults = localStorage.getItem('results') || JSON.stringify([]) 
        setResult(JSON.parse(newResults))
    }, [])

    function numberPush() {
        let newNumber = 0
        exam.map((n) => {
            if(n === true) {
                newNumber += 1
            } else {
                return
            }
        })
        setNumberA(newNumber)
        
    }

    function examPush(id, value = true) {

        let newArray = exam
        if (typeof id === "number") {          
           
            tests.map((test, index) => {
                if (index === id) {
                    newArray[index] = value 
                }         
                
                
            })

            setExam(newArray)
        } else {
            let newArray = []
            tests.map((test) => {
                newArray.push(false)
            })
            setExam(newArray)
            
        }       
        
    }


    useEffect(() => {
        setRight(null)
        setIsFinish(false)
        examPush()
    },
        [props.rend]
    )
    

    function onTest() {
        if (exam.includes (false) && !isFinish) {
            setRight(false)
            numberPush()
            setIsFinish(true)
        } else if (exam.includes (true) && !isFinish) {
         
            setRight(true)
            numberPush()
            setIsFinish(true)

        }
    }

    
    const [render, setRender] = useState(false)

    return (
        <>
        {tests.map((test, index) => {
            if (test.type === "drag") {
                return <DragTest v = {test.variables} q = {test.questions}  test = {test}  exam = {(e) => {examPush(index, e)}} rend = {props.rend} title = {test.title} />
                } 
            if (test.type === "default") {
                return <RadioTest v = {test.variables} trueVar = {test.trueVar} exam = {(e) => {examPush(index, e)}} rend = {props.rend} title = {test.title} id = {test.id} />
            }
            if (test.type === "checkBox") {
                return <CheckBoxTest v = {test.variables} trueVars = {test.trueVar} exam = {(e) => {examPush(index, e)}} rend = {props.rend} title = {test.title} id = {test.id} />
            }
        }) }

            <div className='button-container'>
                <Button variant="success" className='test-button w-25' onClick={onTest}>Проверить ответы</Button>
            </div>
            
            {right === true && <>Все ответы верные!!!  Оценка: 5 </>}
            {right === false && <>Ты где-то ошибся!!!  Оценка: {result}</>}
        </>
    )
}
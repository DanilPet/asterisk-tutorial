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
    const [replays, setReplays] = useState([])
    let result = 2;
    let replay = replays.filter((replay) => replay.id === testId)
    function assessment(num) {
        let point = 5 / numberQ * num
        if (point < 2.5) {
            return 2
        } else if (point >= 2.5 && point < 3.5 ) {
            return 3
        } else if (point >= 3.5 && point < 4.5) {
            return 4
        } else if (point >= 4.5) {
            return 5
        }
   }
   
    result = assessment(numberA)

    function testStart() {
        setIsFinish(false)
        props.block(true)
        localStorage.setItem('qwertyuiojh', props.encr(JSON.stringify(props.test)))
        let newReplays = JSON.parse(props.encr(localStorage.getItem('tesgmddslogrm32')))  || JSON.stringify([]) 
        if (props.encr(localStorage.getItem('tesgmddslogrm32')) === null) {
            localStorage.setItem('tesgmddslogrm32', props.encr(JSON.stringify([])))
        }
                
        setReplays(newReplays)
        setRight(null)
    }

    useEffect(() => {
        testStart()
    }, [])

    useEffect(() => {
        if(isFinish === true) {
            props.block(false)    
            localStorage.removeItem("qwertyuiojh")
        }
    }, [isFinish])

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
        return newNumber 
        
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

    function replaysPush() {
        let newReplays = structuredClone(replays)
        let myNumber = assessment(numberPush())
        newReplays.map((replay) => {
            if (replay.id === testId) {
                replay.replays += 1
                replay.result = myNumber
            }  
        })
        if (newReplays.filter((replay) => {return replay.id === testId}).length === 0) {
            newReplays.push({id: testId, replays: 1, result: myNumber})
        }
        localStorage.setItem("tesgmddslogrm32", props.encr(JSON.stringify(newReplays)) )
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
            replaysPush()
        } else if (exam.includes (true) && !isFinish) {         
            setRight(true)
            numberPush()
            setIsFinish(true)
            replaysPush()
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
                {isFinish === false && <Button variant="success" className='test-button w-25' onClick={onTest}>Проверить ответы</Button>}
                {isFinish === true && <Button variant="success" className='test-button w-25' onClick={testStart}>Повторить тест</Button>}
            </div>

            <div className='results-container'>{replay.length > 0 && <>Количество повторов: {replay[0].replays}
            <br></br>Прошлая попытка выполнена на {replay[0].result}
            </>}</div>
            <div className='results-container'>
                <b>
                {right === true && <>Все ответы верные!!!  Оценка: 5 </>}
                {right === false && <>Ты где-то ошибся!!!  Оценка: {result}</>}
                </b>
                
            </div>
            
        </>
    )
}
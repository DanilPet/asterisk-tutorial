import { useEffect, useState } from 'react'
import DragTest from './DragTest'
import RadioTest from './RadioTest'
import {Button} from 'react-bootstrap'

export default function Tasks({... props}) {
    const [task, setTask] = useState(structuredClone(props.task)) 
    const [exam, setExam] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [right, setRight] = useState(null)

    useEffect(() => {
        setRight(null)
        setIsFinish(false)
        examPush()
        setTask(Object.assign({}, props.task ))
    },
        [props.rend]
    )
    

    function examPush(value = false) {
        setExam(value)        
    }




    function onTest() {
        if (exam === false) {
            setRight(false)
            setIsFinish(true)
        } else if (exam === true) {         
            setRight(true)
            setIsFinish(true)

        }
    }

    
    const [render, setRender] = useState(false)

    return (
        <>
        
            
            <DragTest v = {task.variables} q = {task.questions}  exam = {(e) => {examPush(e)}} rend = {props.rend} title = {task.title} />
              
            {/* <FirstTest />
            <SecondTest v = {imageTestV2} q = {imageTestQ2} hello = "HELLO-WORLD!!!" exam = {(e) => {setSecondTrue(e)}} examt = {secondTrue} /> */}
            <div className='button-container'>
                <Button variant="success" className='test-button w-25' onClick={onTest}>Проверить ответы</Button>
            </div>

            {right === true && <>Ты верно решил задачу. </>}
            {right === false && <>Ты где-то ошибся.</>}
        </>
    )
}
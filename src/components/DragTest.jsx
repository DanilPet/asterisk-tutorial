import { useEffect, useState } from "react"
import { render } from "react-dom";
import { TestsA } from "../data/testsA";
export default function DragTest({... props}) {
   
    const [variables, setVariables] = useState(props.v);
    const [questions, setQuestions] = useState(props.q)
    const [currentVariable, setCurrentVariable] = useState(null)  
    const [currentQuestion, setCurrentQuestion] = useState(null)
    let answersBorder = structuredClone(props.q[0].answers[0].styled.border) 

    useEffect(() => {
        setVariables(props.v)
        setQuestions(props.q)
    }, [props.rend])

    

    const test = [false, false, false, false] == false

    function examination() {
        if (questions.map((question) => {
            if (question.answers.map((answer) => {
                if (answer.fact === answer.number) {
                    return true
                } else {
                    return false
                }
            }).includes(false) === true) {
                return false
            }
            
        }).includes(false) === true ) {
            props.exam(false)
        } else {
            props.exam(true)
        }

    }
    useEffect(() => {
        examination()
    },
        [variables]
    )
    
    // ререндер вопросов

    function newQuestions(question, isNull, answer) {{        
        const newQuestion = Object.assign({}, question)

        let newCurrent
        newCurrent = currentQuestion
        let fromId

        let whereId

        let newAnswerStyled
        let newCurrentStyled

        // стили бордера для входящего блока 
        if (answer) {
            newAnswerStyled = structuredClone(answer.styled)
            whereId = newQuestion.answers.indexOf(answer) 
            newAnswerStyled.border = 0
        }
        
        // стили бордера для исходящего блока 

        if(currentQuestion) {
            fromId = currentQuestion.answers.indexOf(currentVariable)
            newCurrentStyled = structuredClone(currentVariable.styled)
            newCurrentStyled.border = answersBorder            
        }

        // isNull - требуется очистить блок в котором был ответ
        
        if (isNull === true) { // проверка, следует ли очищать блок с ответом
        
            
            newCurrent.answers[fromId] = {id: currentVariable.id, img: "", q: true, fact: currentVariable.fact, styled: newCurrentStyled, number: null  }; 
            // условие требуется для перенесения ответов обратно в блок ответов
            if (answer) {
                newQuestion.answers[whereId] =  {id: answer.id, img: currentVariable.img, q: true, fact: answer.fact, styled: newAnswerStyled, number: currentVariable.number, idA: currentVariable.idA}
            }
            
            
        } else {            
            
            newQuestion.answers[whereId] = {id: answer.id, img: currentVariable.img, q: true, fact: answer.fact, styled: newAnswerStyled, number: currentVariable.number, idA: currentVariable.id}
            // источник здесь
        }        
           
        const newQuestions = questions.toSpliced(question.id, 1, newQuestion)
        if (newCurrent !== null) {
            newQuestions.splice(newCurrent.id, 1, newCurrent)
        } 

        

        setQuestions(newQuestions)
    }}

    function final(question, newVariables, isNull, answer) {
        newQuestions(question, isNull, answer)        
        setVariables(newVariables)
        setCurrentVariable(null)
        setCurrentQuestion(null)
    }

    // добавление ответа

    function onDropHandle(e, question, answer) {

        e.preventDefault()
        let newVariables
        const variableId = variables.indexOf(currentVariable)
        
        if (currentVariable.q) {
            newVariables = variables.toSpliced(currentVariable.id, 0)            
            final(question, newVariables, true, answer)
        } else {
            newVariables = variables.toSpliced(variableId, 1)    
            
            final(question, newVariables, false, answer )            
        }        
       
    }    

    // возврат ответа
    function VariablesDropHandle(e, question) {
        e.preventDefault()
        let newCurrentVariable = {id: currentVariable.idA, img: currentVariable.img, number: currentVariable.number}
        const newVariables = variables.toSpliced(newCurrentVariable.id, 0, newCurrentVariable)
        final(question, newVariables, true)
        
    }
    // DRAG-START
    
    function dragStartHandle(e, variable, question) {
        setCurrentVariable(variable)
        if (question) {
            setCurrentQuestion(question)
        }
        

    }

    // DRAG-OVER

    function dragOverHandle(e, answer) {
        if (answer) {
            if(answer.img === "") {
                e.preventDefault()
            } 
        } else {
            e.preventDefault()
        }

        
    }
 
    return (
        <>
            <h4>{props.title}</h4>
            <div className="second-test">
            
                {questions.map((question) => {
                    return  (
                        <div className="image-container"><img className="test-image" src={question.img}></img>
                      
                            {question.answers.map((answer) => {
                                return (                                  

                                    <div className="answer-container"  style={answer.styled}
                                        onDragOver={(e) => {dragOverHandle(e, answer)}}
                                        onDrop={(e) => {onDropHandle(e, question, answer)}}
                                    >
                            
                                    <img  
                                        className="answer-img"
                                        src={answer.img}
                                        onDragStart={(e) => {dragStartHandle(e, answer, question )}}
                                        style={{cursor: "grab"}}
                                    ></img>                           
                        </div>
                                )
                            })}
                            
                </div>)
                })}

            </div>

            <div className="second-variables"
             onDrop={(e) => {VariablesDropHandle(e, currentQuestion)}}
             onDragOver={(e) => {dragOverHandle(e)}}
            >
                {variables.map((variable) => {
                    return <img 
                    key={variable.id}
                    src={variable.img} 
                    onDragStart={(e) => {dragStartHandle(e, variable)}}                 
                    
                    ></img>
                })}
            </div>
        </>
    )
}
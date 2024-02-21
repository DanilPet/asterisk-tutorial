import { useState } from "react"
import Lection from "./slides/Lection"
import Test from "./slides/Test"
import Practice from "./slides/Practice"
import Task from "./slides/Task"

export default function Slider({... props}) {
    
    if (props.thisTest === true) {
        return( 
 
            <>
                
                {props.visible && (
                     <Test test = {props.test} rend = {props.rend} block = {props.block} />   
                    
                )}
                
            </>
        )
    } else if (props.thisPractice === true) {
        return( 
 
            <>
                
                {props.visible && (
                     <Practice practice = {props.practice} />   
                    
                )}
                
            </>
        )

    }else if (props.thisTask === true) {
        return( 
 
            <>
                
                {props.visible && (
                     <Task module = {props.module} leftArrow = {props.leftArrow} rightArrow = {props.rightArrow} tButton = {props.tButton} tOpen = {props.tOpen} test = {props.test} />
    
                    
                )}
                
            </>
        )
    } else {
        return( 
 
            <>
                
                {props.visible && (
                     <Lection module = {props.module} leftArrow = {props.leftArrow} rightArrow = {props.rightArrow} tButton = {props.tButton} tOpen = {props.tOpen} test = {props.test} />
    
                    
                )}
                
            </>
        )
    
    }
}

    
import { useState } from "react"


import SliderSection from "./SliderSection"
export default function Header({sliderFunction, ...props}) {
    
    return(
        <header>
            <h1>Программная IP АТС Asterisk</h1>
            
            <SliderSection sliderFunction={sliderFunction} choiced = {props.choiced} visiblesCreate = {props.visiblesCreate} visibles = {props.visibles} setVisibles = {(r) => {props.setVisibles(r)}} />
            
        </header>
    )
}
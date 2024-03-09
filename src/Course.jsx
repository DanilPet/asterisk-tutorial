import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Slider from './components/Slider'
import {slides,  lections } from './data/Asterisk'
import { TestsA } from './data/testsA'
import { practicesA } from './data/practices'


function visiblesCreate(slides) {
    let newVisible = []
    slides.map((slide) => {
        newVisible.push(true)
    })
  
    return newVisible
  }     

export default function Course({...props}) {

	const [visible, setVisible] = useState(false)
	const [modules, setModules] = useState([])
	const [moduleId, setModuleId] = useState()
	const [lectionId, setLectionId] = useState()
	const [blockSlides, setBlockSlides] = useState(false)
	const [thisTest, setThisTest] = useState(false)
	const [thisTask, setThisTask] = useState(false)
	const [thisPractice, setThisPractice] = useState(false)
	const [tests, setTests] = useState({})
	const [practice, setPractice] = useState({})
	const [rend, setRend] = useState(false)
	const [testButton, setTestButton] = useState(false)

	let choiced = [slides, lections, structuredClone(TestsA), practicesA]	
	
	const [visibles, setVisibles] = useState(visiblesCreate(choiced[0]))

	useEffect(() => {
        const newTests = JSON.parse(props.encr(localStorage.getItem('qwertyuiojh')))  || JSON.stringify({}) 
        setTests(newTests)
		if (newTests.tests) {
			setTimeout(() => {sliderF(null, null, newTests)}, 2)
		}
		setTimeout(() => {setVisible(true)}, 4)
    }, [])

	function onRightArrow() {
	let thisId = 0
	if(moduleId === modules.length - 1) {
		thisId = 0
	} else {
		thisId = moduleId + 1
	}
	if (modules[thisId].type === "lection") {
		setThisTask(false)
	}
	setThisTask(false)
	setTimeout(() => {sliderF(thisId, lectionId, null, null, modules[thisId].type)}, 2)
	}

	function onLeftArrow() {
	let thisId = 0
	if(moduleId === 0 ) {
		thisId = modules.length - 1
	} else {
		thisId = moduleId - 1
	}

	if (modules[thisId].type === "lection") {
		setThisTask(false)
	}
	setThisTask(false)
	setTimeout(() => {sliderF(thisId, lectionId, null, null, modules[thisId].type)}, 2)

	}

	useEffect(() => {	
		if (moduleId === modules.length - 1 && 
				choiced[2].map((test) => {
				if (test.lectionId === lectionId) {	
					setTests(test)			
					return true
				}				
			}
			).includes(true))  {
			
				setTestButton(true)	

			
		} else {
			setTestButton(false)
		}
	}, [rend])

	useEffect(() => {		
	
		setVisible((k) => !k)
		setTimeout(() => {setVisible((k) => !k)}, 2)
		
	}, [rend])

	

	// Вызов слайдера

	function sliderF(moduleId, lectionId, test, practice, type) {
		setThisTask(false)
		
		if (test && blockSlides === false) {			
			setRend(t => !t)
			setVisible(true)
			setThisTest(false)
			setTests({})
			setTimeout(() => {				
				setThisTest(true)		
				setTests(test)	
			}, 2)
			

		} else if(practice && blockSlides === false) {
			setVisible(true)
			setRend(t => !t)
			setThisPractice(true)		
			setPractice(practice)
			setThisTest(false)
		} else if(!test && blockSlides === false) {
			let newModules = []
			if (type === "lection") {
				choiced[1][lectionId].modules.map((module) => {
					if (module.id === moduleId) {
						setVisible(true)						
					}
					newModules.push(module)
				})
			} else if (type === "task") {
				lections[lectionId].modules.map((module) => {
					if (module.id === moduleId) {
						setThisTask(true)
						setVisible(true)
						setRend(t => !t)
						
					}
					newModules.push(module)
				})
			}
			
			setRend(t => !t)
			setThisTest(false)
			setThisPractice(false)
			setModules(newModules)
			setLectionId(lectionId)
			setModuleId(moduleId)
		}
	}
	
	return (
	<div onClick={(e) => {
		if(e.target.className !== "select" && e.target.className !== "lection" && e.target.className !== "arrow" && visibles.filter((visible) => {return visible === false}).length !== 0) {
		setVisibles(visiblesCreate(choiced[0]))
		}

	}}>
	
		<Header sliderFunction = {sliderF} header = {props.header} choiced = {choiced} visiblesCreate = {() => {return visiblesCreate(choiced[0])}} visibles = {visibles} setVisibles = {(r) => {setVisibles(r)}}/>
		<Slider module = {modules[moduleId]} encr = {props.encr} rend = {rend} block = {setBlockSlides} visible = {visible} rightArrow={onRightArrow} leftArrow={onLeftArrow} thisTest = {thisTest} test = {tests} tButton = {testButton} tOpen = {sliderF} practice = {practice} thisPractice = {thisPractice} thisTask = {thisTask} />
		
		
	</div>

	)
}
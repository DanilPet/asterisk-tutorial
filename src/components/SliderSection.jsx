import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import useInput from "../hooks/useInput";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

export default function SliderSection({... props}) {
    const input = useInput()
    const [nullHeight, setNullHeight] = useState(false)
    const [open, setOpen] = useState(false)

    let sStyle

    nullHeight == false ? sStyle = 0 : sStyle = 900 + "px" 

    function selectAnimation() {
        setTimeout(() => {
            setNullHeight(true)
            setOpen(false)
        },
            100
        )
        
    }
    
    open == true ? selectAnimation() : null
    function visibleClick(id) {  
        var newVisibles = props.visiblesCreate()
        newVisibles[id] = !props.visibles[id]
        props.setVisibles(newVisibles)
        setNullHeight(false)
        setOpen(true)
    }

    let selectStyle = {
        height: sStyle,
        transition: "all "  + 1000 + "ms"
    }
    var thisSlides = props.choiced[0]
        
        .filter((slide) => {
            let myArray = props.choiced[1][slide.id].modules.map((lection) => {return lection.title.toLowerCase().includes(input.value.toLowerCase())})
            if (slide.titleS.toLowerCase().includes(input.value.toLowerCase())) {
                return true
                
            } else if(myArray.includes(true)) {
                return true
            }
            else {
                false
            }
            
        }
    
    
    )     

    var thisPractices = props.choiced[3]
        
    .filter((practice) => {
        if (practice.titleS.toLowerCase().includes(input.value.toLowerCase())) {
            return true
            
        } 
        else {
            false
        }
        
    }


)     

    
    return (
        <>
            <div className="search">
                <input placeholder="найти лекцию или практику" {... input} ></input>
            </div>
            
            <div className="slider_menu" >
                <div className="arrow_container" id = "prev_arrow"><img className="arrow w-100" src="arrowL.png"></img></div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    navigation={{
                        nextEl: "#next_arrow",
                        prevEl: "#prev_arrow"
                    }}
                    speed={400}       
                    
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        425: {
                            slidesPerView: 1,
                            spaceBetween: 50,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1600: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                        
                    }}             
                    
                    modules={[Navigation, Pagination]}
                    className="mySwiper"

                >
                {
                thisSlides.map((slide) => {
                    return <SwiperSlide className="slider_container" key={slide.id}>
                            <>
                                <div className="lection" onClick={() => {visibleClick(slide.id)}} key={slide.id}>
                                {slide.title}     
                                </div>

                                
                                {!props.visibles[slide.id] && 
                            
                                <div className="select" style = {selectStyle} >
                                    {props.choiced[1][slide.id].modules.map((module) => {
                             
                                        return <div className="module" onClick={() => props.sliderFunction(module.id, slide.id, null, null, module.type)} key={module.id}>{module.title}</div>
                                    })} 
                                        
                                    {props.choiced[2].map((test) => {
                                        if (test.lectionId == slide.id) {
                    
                                            return <div className="module" onClick={() => props.sliderFunction(null, null, test)}>{test.name}</div>
                                        }
                                    })}                
                            </div>
                        }
                            </>
                    </SwiperSlide>

                    
                })                
                }

                {thisPractices.map((practice) => {
                    return <SwiperSlide className="slider_container" key={practice.id}>
                            <>
                                <div className="lection" onClick={() => props.sliderFunction(null, null, null, practice)}  key={practice.id}>
                                {practice.title}     
                                </div>
                            </>
                    </SwiperSlide>
                }) }
                
                </Swiper>

                <div className="arrow_container" id = "next_arrow"><img className="arrow w-100" src="arrowR.png"></img></div>
                    
            </div>        
        </>        
    )
}
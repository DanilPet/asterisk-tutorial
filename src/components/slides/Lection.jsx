export default function Lection({... props}) {
    const thisModule = props.module
    console.log("thisModule", props.module)
    return (
        <>{thisModule && <div className="slider">
        <div className="slider_block">
        {thisModule.img && 
            <div className="image_container">
                {thisModule.img && <>{thisModule.img.map((image) => {
                    return <>
                    <img className="d-block slider-img" src={image}></img>
                    {thisModule.imgTitle && <div className="image_title">{thisModule.imgTitle}</div>}
                    </> 
                })}</> } 
            </div>
        }          
            <div className="slider_content">
                <h2>{thisModule.title}</h2>
                <div className="slider_lection">{thisModule.content}</div>
            </div>
        </div>
        <div className="slider_footer">
            <div className="slider_arrow_container" onClick={props.leftArrow}>
                <div className="arrow"><img src="arrowLB.png"></img></div>
            </div>
            
            {props.tButton === true && <button className="button_test" onClick={(() => {
                props.tOpen(null, null, props.test)
            })}>Перейти к тесту</button>} 
            

            <div className="slider_arrow_container" onClick={props.rightArrow}>
                <div className="arrow"><img src="arrowRB.png"></img></div>     
            </div>
        </div>
    </div>}</>
        
    )
    
}
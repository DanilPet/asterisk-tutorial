import Tasks from "../Tasks";

export default function Task({... props}) {

    return (
        <div className="slider">
            <div className="task_block">
               <Tasks task = {props.module} />
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
        </div>
    )
    
}
export default function Practice({... props}) {
    
    return (
        <div className="slider">
            <div className="slider_practice">
                <h3>{props.practice.title}</h3>
                {props.practice.content}
                
            </div>
        </div>
    )
    
}
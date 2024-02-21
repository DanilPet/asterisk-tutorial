import { createPortal } from "react-dom"

export default function Footer({... props}) {

    function clearUser() {
        localStorage.clear()
        props.clearUser({})
    } 
    
    return createPortal(
        <footer>
            <div className="footer-data">Пользователь: {props.user.name} {props.user.surName}</div>

            <img className="footer-exit" id="footer-exit" onClick={() => {clearUser()}} src="exit.png"></img>

            <div className="footer-data">Время регистрации: {props.user.date}</div>
        </footer>,
        document.getElementById("footer")
    ) 
}
import { useEffect, useState } from 'react'
import './App.css'
import Course from './Course'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const [rend, setRend] = useState(false)

  function ae(ai) {
    if (ai) {
      var f = "";
      for (var c = 0; c < ai.length; c++) {
          f += String.fromCharCode(ai.charCodeAt(c) ^ (1 + (ai.length - c) % 32))
      }
      return f
    }
    return null
    
  }

  useEffect(() => {
    const newUser = ae(localStorage.getItem('tesgmddslogrm23')) || JSON.stringify({})
    setUser(JSON.parse(newUser))
  }, [])

  // шифровка данных
  
  function login() {
    let newErrors = []
    let newUser = {
      name: document.getElementById("name").value,
      surName: document.getElementById("surName").value,
      date: new Date().toLocaleTimeString(),
    }

    if (newUser.name.length < 1 || typeof newUser.name != "string") {
      newErrors.push("В имени должно быть не менее 1 символа")
    }

    if (newUser.name.length >=  20) {
      newErrors.push("У тебя слишком длинное имя, смени его")
    }
    if (newUser.surName.length < 1 || typeof newUser.name != "string") {
      newErrors.push("В фамилии должно быть не менее 1 символа")
    }
    if (newUser.surName.length >=  20) {
      newErrors.push("У тебя слишком длинная фамилия, смени её")
    }

    if (newErrors.length !== 0) {
      setErrors(newErrors)
    } else {
      localStorage.setItem('tesgmddslogrm23', ae(JSON.stringify(newUser)))
      setUser(newUser)
    }
    
  }

  return (    
    <>     

      {!user.name && <>
        <div className='paths_container flex'>
          <div className='login_block'>
            <div className='login-title'>Регистрация</div>
              <input type='text' className='login-form' id="name" placeholder='Имя'></input>
              <input type='text' className='login-form' id="surName" placeholder='Фамилия'></input>
              <div className='login-errors'>
                {errors.map((error) => {
                  return <div className='login-error'>{error}</div>
                })}
              </div>
              <button className='login-button' onClick={() => {login()}} >Войти</button>
            </div>
        </div>
        
      </>}
     

      {user.name && <Course encr = {ae} header = "Asterisk" />}
                
      {user.name !== null && <Footer user = {user} clearUser = {setUser}/>}
      
    </>
  )
}

export default App

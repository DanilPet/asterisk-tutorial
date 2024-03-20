import { useEffect, useState } from 'react'
import './App.css'
import Course from './Course'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const [rend, setRend] = useState(false)

  function ae(xor) {
    if (xor) {
      var val = "";
      for (var i = 0; i < xor.length; i++) {
          val += String.fromCharCode(xor.charCodeAt(i) ^ (1 + (xor.length - i) % 32))
      }
      return val
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
    if (newUser.name.length < 1 || newUser.surName.length < 1) {
      newErrors.push("Имя и фамилия должны содержать не менее 1 символа")
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

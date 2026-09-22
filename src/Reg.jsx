// import { useState } from "react"
// import "./index.css"

// function Reg() {

//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//     e.preventDefault();
//     }
    
//     const hasUpperCase = /[A-ZА-Я]/.test(password);

//     if (!hasUpperCase) {
//       alert("Пароль должен содержать хотя бы одну заглавную букву");
//       return;
//     }



//     return(
//     <>
//     <form>
//     <div id = "Registration">
//     <h1>Регистрация</h1>
//     <input type="text" placeholder="name" required/>
//     <input type="email" placeholder="email" required/>
//     <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//     <button type="submit" >Зарегаться</button>
//     </div>
//     </form>
    
//     </>
//     )
// }


// export default Reg
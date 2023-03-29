import React, { useState } from 'react'
import authenticate from './LoginService';
function Login() {

  const [isLogged,setLogged] = useState(false);
  const [username,setUsername] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [isLoading,setLoading] = useState(false);

  const checkLoginForm = async (event : any) => {
    event.preventDefault();
    setLoading(true)
    setLogged(await authenticate(username,password))
    setLoading(false)
  }

  return (<>
    <div>Login</div>
    {isLoading && <p>Authentication in progress....</p>}
    <form  onSubmit={checkLoginForm}>
        <input type="text" onChange={e=>setUsername(e.target.value)} ></input>
        <input type="password" onChange={ e=>setPassword(e.target.value) } ></input>
        <button type="submit"  >Login</button>
    </form>
    {isLogged && <p>User is logged in</p>}
    </>
  )
}

export default Login
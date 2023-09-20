import {useContext, useState} from 'react';
import axios from 'axios';
import {login} from './network';
import context from './Context';

export default function Login(){
  const [user, setUser] = useState({email: "", password: ""})
  const change = (e) =>{
    setUser({...user, [e.target.name]: e.target.value});
  }
  const callByFetch = async () => {
    const url = "http://localhost:5001/login";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    console.log(res);
    if(res.ok){
      const obj = await res.json();
      console.log(obj);
    }
  }
  const {state, setState} = useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(user);
    if(res){
      if(res.success){
        setState({...state, user: res.data})
      }else{
        alert(res.message);
      }
    }
  }
  return( 
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={user.email} name="email" placeholder='Email' onChange={change}/>
        <input type="password" value={user.password} name="password" placeholder='Password' onChange={change}/>
        <input type="submit"/>
      </form>
    </div>
  )
}
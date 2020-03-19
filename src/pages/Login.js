import React, { useState } from 'react';
import Auth from '../lib/auth'
import axios from 'axios'

const Login = ({history}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('aaaaa');
    history.push('/game')
  }



return(
<div>
  Hello, Welcome to Catan!

  Enter name to login:
  <form onSubmit={handleSubmit}>
  <input value={"Name"}></input>
  <button >Click to go to game</button>
  </form>
</div>
)
}

export default Login
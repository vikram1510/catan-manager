import React, { useState } from 'react';
import Auth from '../lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Login = () => {



return(
<div>
  Hello, Welcome to Catan!

  Enter name to login:
  <input value={"Name"}></input>
  <Link to='/game'>Click to go to game</Link>
</div>
)
}

export default Login
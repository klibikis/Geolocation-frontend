import { useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = useNavigate();

  const userEmail = sessionStorage.getItem("geoLocation_userEmail");
  const userPassword = sessionStorage.getItem("geoLocation_userPassword");

  const handleSubmit = () => {
    sessionStorage.setItem("geoLocation_userEmail", email);
    sessionStorage.setItem("geoLocation_userPassword", password);
    redirect('/map')
  }

  useEffect(() => {
    if(userEmail && userPassword){
      redirect('/map')
    }
  }, [])

  return (

    <div className={ styles.formContainer }>
      <svg xmlns="http://www.w3.org/2000/svg" className={ styles.site__logo } width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stopColor="#8ceabb"/><stop offset="100%" stopColor="#378f7b"/></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"/></svg>
      <h2 className={ styles.signUpTitle}>Sign In</h2>
      <form 
        className={ styles.form }
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
          setEmail('')
          setPassword('')
        }}
      >
        <div>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            required
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}/>
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            required
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}/>
        </div>
        <div>
          <button 
            type="submit" 
            className={ styles.buttonSubmit }>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
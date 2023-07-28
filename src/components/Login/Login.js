import React, { useState , useEffect , useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailreducer = (state,action) =>{
  if(action.type === 'user_input'){
return {value:action.val,isvalid : action.val.includes('@')};
  }
  if(action.type === 'input_blur'){
    return {value : state.value , isvalid : state.value.includes('@')};
  }
  return{value : '',isvalid : false};
};
const passwordreducer = (state,action) =>{
  if(action.type === 'user_input'){
    return {value : action.val , isvalid : action.val.trim().length > 6};
  }
  if(action.type === 'input_blur'){
    return {value : state.value , isvalid : state.value.trim().length>6};
  }
}
const collegereducer = (state,action) =>{
  if(action.type === 'user_input'){
    return {value : action.val , isvalid : action.val.trim().length > 0};
  }
  if(action.type === 'input_blur'){
    return {value : state.value , isvalid : state.value.trim().length>0};
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredclgname,setclgname] = useState('');
  // const[collegeIsValid,setCollegeisValid] = useState();

  const [emailState,dispatchEmail] = useReducer(emailreducer,{
    value: '',
    isvalid : null,
  });
  const [passwordState,dispatchPassword] =useReducer(passwordreducer,{
    value : '',
    isvalid : null,
  });
  const [collegeState,dispatchcollege] =useReducer(collegereducer,{
    value : '',
    isvalid : null,
  });
 useEffect(()=>{
  console.log('Effect Running');
  return ()=>{
    console.log('effect clean up');
  }
 }
 ,[passwordState.value])
  // useEffect(()=>{
  //   const timer =  setTimeout(()=>{
  //     console.log('Checking form validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredclgname.length>0
  //     );
  //   },500);
  //   return ()=>{
  //     console.log('Inside cleanup function');
  //     clearTimeout(timer);
  //   }; 
  // },[enteredEmail,enteredPassword,enteredclgname]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'user_input', val : event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isvalid && collegeState.isvalid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'user_input',val : event.target.value})
    setFormIsValid(
    emailState.isvalid && event.target.value.trim().length > 6 && collegeState.isvalid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isvalid);
    dispatchEmail({type:'input_blur'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'input_blur'});
  };
  const clgChangeHandler = (event) =>{
   dispatchcollege({type:'user_input',val : event.target.value})
    setFormIsValid(
      emailState.isvalid && passwordState.isvalid && event.target.value.length>0
    );
  }
  const validateClgHandler = ()=>{
    // setCollegeisValid(enteredclgname.length>0);
    dispatchcollege({type : 'input_blur'});
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clgname">College Name</label>
          <input
            type="text"
            id="clgname"
            value={collegeState.value}
            onChange={clgChangeHandler}
            onBlur={validateClgHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

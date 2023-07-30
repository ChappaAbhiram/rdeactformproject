import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
const emailreducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isvalid: state.value.includes("@") };
  }
  return { value: "", isvalid: false };
};
const passwordreducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isvalid: action.val.trim().length > 6 };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isvalid: state.value.trim().length > 6 };
  }
};
const collegereducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isvalid: action.val.trim().length > 0 };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isvalid: state.value.trim().length > 0 };
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredclgname,setclgname] = useState('');
  // const[collegeIsValid,setCollegeisValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailreducer, {
    value: "",
    isvalid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordreducer, {
    value: "",
    isvalid: null,
  });
  const [collegeState, dispatchcollege] = useReducer(collegereducer, {
    value: "",
    isvalid: null,
  });
  const authctx = useContext(AuthContext);
  useEffect(() => {
    console.log("Effect Running");
    return () => {
      console.log("effect clean up");
    };
  }, []);
  const { isvalid: emailisvalid } = emailState;
  const { isvalid: passwordisvalid } = passwordState;
  const { isvalid: collegeisvalid } = collegeState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailisvalid && passwordisvalid && collegeisvalid);
    }, 500);
    return () => {
      console.log("Inside cleanup function");
      clearTimeout(timer);
    };
  }, [emailisvalid, passwordisvalid, collegeisvalid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isvalid && collegeState.isvalid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "user_input", val: event.target.value });
    setFormIsValid(
      emailState.isvalid &&
        event.target.value.trim().length > 6 &&
        collegeState.isvalid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isvalid);
    dispatchEmail({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "input_blur" });
  };
  const clgChangeHandler = (event) => {
    dispatchcollege({ type: "user_input", val: event.target.value });
    setFormIsValid(
      emailState.isvalid &&
        passwordState.isvalid &&
        event.target.value.length > 0
    );
  };
  const validateClgHandler = () => {
    // setCollegeisValid(enteredclgname.length>0);
    dispatchcollege({ type: "input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Email"
          type="email"
          isvalid={emailisvalid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isvalid={passwordisvalid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
          <Input
          id="clgname"
          label="College Name"
          type="text"
          isvalid={collegeisvalid}
          value={collegeState.value}
          onChange={clgChangeHandler}
          onBlur={validateClgHandler}
        />
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
